(() => {
    const gallery = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const img = lightbox?.querySelector('img');
    const label = lightbox?.querySelector('p');
    let previous = null;
    document.querySelectorAll('.filter-btn').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(x => x.classList.toggle('selected', x === b));
        gallery.forEach(item => {
            item.hidden = b.dataset.filter !== 'Все' && item.dataset.category !== b.dataset.filter
        }
        )
    }
    ));
    gallery.forEach(item => item.addEventListener('click', () => {
        previous = item;
        img.src = item.dataset.src;
        img.alt = item.dataset.title;
        label.textContent = item.dataset.title;
        lightbox.hidden = false;
        document.body.classList.add('modal-open');
        lightbox.querySelector('.lightbox-close').focus()
    }
    ));
    function close() {
        if (!lightbox) return;
        lightbox.hidden = true;
        img.removeAttribute('src');
        document.body.classList.remove('modal-open');
        previous?.focus()
    }
    lightbox?.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox?.addEventListener('click', e => {
        if (e.target === lightbox) close()
    }
    );
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !lightbox?.hidden) close()
    }
    );
    const el = document.getElementById('projects-container');
    if (!el) return;
    fetch('/api/projects').then(r => {
        if (!r.ok) throw Error();
        return r.json()
    }
    ).then(items => {
        el.replaceChildren();
        if (!items.length) {
            el.textContent = 'Дополнительных проектов пока нет.';
            return
        }
        items.forEach(x => {
            const a = document.createElement('article');
            a.className = 'dynamic-card';
            const h = document.createElement('h3');
            h.textContent = x.title;
            const p = document.createElement('p');
            p.textContent = x.description;
            const small = document.createElement('small');
            small.textContent = x.category || '';
            a.append(small, h, p);
            if (x.main_image) {
                const pic = document.createElement('img');
                pic.loading = 'lazy';
                pic.alt = x.title;
                pic.src = x.main_image;
                a.prepend(pic)
            }
            el.append(a)
        }
        )
    }
    ).catch(() => {
        el.textContent = 'Проекты из базы данных временно недоступны.'
    }
    )
}
)();
