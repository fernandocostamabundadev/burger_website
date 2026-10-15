const menu = document.getElementById('nav-menu');
const toggle = document.getElementById('nav-toggle');
const close = document.getElementById('nav-close');

function setMenuOpen(open) {
  if (!menu || !toggle) return;

  const wasOpen = menu.classList.contains('show-menu');
  menu.classList.toggle('show-menu', open);
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar navegação' : 'Abrir navegação');

  if (open) menu.querySelector('.nav__link')?.focus();
  else if (wasOpen) toggle.focus();
}

toggle?.addEventListener('click', () => {
  setMenuOpen(!menu?.classList.contains('show-menu'));
});
close?.addEventListener('click', () => setMenuOpen(false));
menu?.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.classList.contains('show-menu')) {
    setMenuOpen(false);
  }
});

const header = document.getElementById('header');
const scrollUp = document.getElementById('scroll-up');
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav__link')];

function updatePageState() {
  header?.classList.toggle('header-shadow', window.scrollY > 40);
  scrollUp?.classList.toggle('show-scroll', window.scrollY > 400);
  let current = sections[0];
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) current = section;
  });
  links.forEach((link) => {
    const active = link.hash === `#${current?.id}`;
    link.classList.toggle('active-link', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

window.addEventListener('scroll', updatePageState, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 767 && menu?.classList.contains('show-menu')) {
    setMenuOpen(false);
  }
});
updatePageState();

const selectedItems = [];
const orderStatus = document.getElementById('order-status');
document.querySelectorAll('.order-button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.dataset.item;
    if (!item || !orderStatus) return;

    selectedItems.push(item);
    button.classList.add('is-added');
    orderStatus.textContent = `${item} adicionado. ${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'itens'} no seu pedido nesta página.`;
  });
});

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealTargets = document.querySelectorAll(
    '.recipe > .container > *, .recipe__container article, .popular > .container > *, .popular__card, .delivery__container > *, .contact__container > *',
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  revealTargets.forEach((target) => {
    target.classList.add('reveal-ready');
    revealObserver.observe(target);
  });
}
