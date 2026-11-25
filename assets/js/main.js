/* =============================================================================
   H&S Group  /  Interactions (shared by all group websites)
   ============================================================================= */

(function(){
  'use strict';

  /* ---------- Sticky nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 60) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const body = document.body;
  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('menu-open');
      const expanded = body.classList.contains('menu-open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    document.querySelectorAll('.mobile-menu a').forEach(a => {
      a.addEventListener('click', () => {
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Counter animation ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      const easeOut = t => 1 - Math.pow(1 - t, 3);
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const val = Math.floor(target * easeOut(t));
        el.textContent = val.toString();
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toString();
      };
      requestAnimationFrame(tick);
    };
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          countIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => countIo.observe(c));
  }

  /* ---------- Smooth anchor scroll for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Forms: validation + FormSubmit delivery ---------- */
  document.querySelectorAll('form[data-formsubmit]').forEach(form => {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const ok = field.type === 'checkbox' ? field.checked : field.value.trim() !== '';
        field.style.borderColor = ok ? '' : '#c44';
        if (!ok) valid = false;
      });
      if (!valid) {
        if (status) { status.className = 'form-status err'; status.textContent = 'Please complete the highlighted fields.'; }
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      const label = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      try {
        const data = Object.fromEntries(new FormData(form).entries());
        const res = await fetch('https://formsubmit.co/ajax/' + form.dataset.formsubmit, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        if (status) { status.className = 'form-status ok'; status.textContent = form.dataset.success || 'Thank you. Your message has been received and a member of our team will respond within one business day.'; }
      } catch (err) {
        if (status) { status.className = 'form-status err'; status.innerHTML = 'We could not send your message. Please email us directly at <a href="mailto:' + form.dataset.formsubmit + '"><u>' + form.dataset.formsubmit + '</u></a>.'; }
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = label; }
      }
    });
  });

  /* ---------- Before / after slider ---------- */
  document.querySelectorAll('.ba').forEach(ba => {
    const range = ba.querySelector('input[type="range"]');
    if (!range) return;
    const set = () => ba.style.setProperty('--pos', range.value + '%');
    range.addEventListener('input', set);
    set();
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- Subtle parallax on hero background ---------- */
  const heroBg = document.querySelector('.hero .hero-bg');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const onParallax = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight) {
            heroBg.style.transform = `translateY(${y * 0.25}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onParallax, { passive: true });
  }

})();
