(() => {
    const root = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const menu = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const base = location.pathname.includes('/pages/') ? '../images/' : 'images/';
    function refresh() {
        const dark = root.classList.contains('dark-theme');
        if (icon) icon.src = base + (dark ? 'sun.png' : 'moon.png');
        if (btn) btn.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему')
    }
    refresh();
    btn?.addEventListener('click', () => {
        root.classList.toggle('dark-theme');
        try {
            localStorage.setItem('theme', root.classList.contains('dark-theme') ? 'dark' : 'light')
        }
        catch (e) {

        }
        refresh()
    }
    );
    menu?.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menu.setAttribute('aria-expanded', String(open));
        menu.textContent = open ? '×' : '☰'
    }
    );
    nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('open');
        menu?.setAttribute('aria-expanded', 'false')
    }
    ));

}
)();
