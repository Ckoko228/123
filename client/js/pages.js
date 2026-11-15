(() => {
    const slug = location.pathname.includes('about') ? 'about' : 'contacts';
    fetch('/api/pages/' + slug).then(r => {
        if (!r.ok) throw Error();
        return r.json()
    }
    ).then(page => {
        const content = document.getElementById(slug + '-content');
        if (content && page?.content) content.textContent = page.content
    }
    ).catch(() => {

    }
    )
}
)();
