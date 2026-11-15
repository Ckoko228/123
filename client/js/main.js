(() => {
    const el = document.getElementById('services-container');
    if (!el) return;
    fetch('/api/services').then(r => {
        if (!r.ok) throw Error();
        return r.json()
    }
    ).then(items => {
        el.replaceChildren();
        if (!items.length) {
            el.textContent = 'Дополнительных услуг пока нет.';
            return
        }
        items.forEach(s => {
            const a = document.createElement('article');
            a.className = 'dynamic-card';
            const h = document.createElement('h3');
            h.textContent = s.title;
            const p = document.createElement('p');
            p.textContent = s.description;
            a.append(h, p);
            el.append(a)
        }
        )
    }
    ).catch(() => {
        el.textContent = 'Дополнительный каталог временно недоступен.'
    }
    )
}
)();
