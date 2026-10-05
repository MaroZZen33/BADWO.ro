// Meniu pe telefon
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('meniu');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Filtru portofoliu
const filterBtns = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  const f = btn.dataset.filter;
  filterBtns.forEach(b => b.setAttribute('aria-pressed', b === btn));
  projects.forEach(p => { p.hidden = f !== 'toate' && p.dataset.cat !== f; });
}));

// Video în fereastră (YouTube)
const modal = document.getElementById('video-modal');
const frame = modal.querySelector('.modal-frame');
document.querySelectorAll('.js-video').forEach(el => el.addEventListener('click', () => {
  const id = (el.dataset.video || '').trim();
  frame.innerHTML = id
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" title="Video BADWO Media" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`
    : '<p>Videoclipul va apărea aici în curând.</p>';
  modal.showModal();
}));
function closeModal(){ modal.close(); }
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
modal.addEventListener('close', () => { frame.innerHTML = ''; });

// Anul curent în footer
document.getElementById('an').textContent = new Date().getFullYear();

// Formular de contact (Formspree) — trimite fără să părăsești pagina
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.action.includes('XXXXXXXX')) {
    statusEl.textContent = 'Formularul nu e încă conectat. Scrie-ne direct pe email.';
    return;
  }
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  statusEl.textContent = 'Se trimite...';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      form.reset();
      statusEl.textContent = 'Mesaj primit. Revenim curând pe email.';
    } else {
      statusEl.textContent = 'Mesajul nu a plecat. Verifică câmpurile și încearcă din nou, sau scrie-ne pe email.';
    }
  } catch {
    statusEl.textContent = 'Nu există conexiune la internet. Încearcă din nou peste puțin timp.';
  } finally {
    btn.disabled = false;
  }
});

// Ascunde etichetele „Premieră” după lansarea filmului (vineri, 9 octombrie 2026, 12:00)
const LAUNCH = new Date('2026-10-09T12:00:00+03:00');
function checkLaunch(){
  if (Date.now() >= LAUNCH) document.querySelectorAll('.pre-launch').forEach(el => el.remove());
}
checkLaunch();
setInterval(checkLaunch, 30000);
