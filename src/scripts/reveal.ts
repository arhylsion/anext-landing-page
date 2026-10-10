import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REDUCED = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initGlobalReveals() {
  if (typeof window === 'undefined') return;
  if (REDUCED()) {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
    return;
  }

  // Generic [data-reveal] entrance: fade-up | blur | scale
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const kind = el.dataset.reveal || 'fade-up';
    const delay = parseFloat(el.dataset.revealDelay || '0');
    const y = kind === 'scale' ? 12 : 28;
    const scale = kind === 'scale' ? 0.96 : 1;
    const blur = kind === 'blur' ? 8 : kind === 'fade-up' ? 4 : 0;

    gsap.set(el, {
      opacity: 0,
      y,
      scale,
      filter: blur ? `blur(${blur}px)` : 'none',
      willChange: 'opacity, transform, filter',
    });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          delay,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: () => {
            el.style.willChange = 'auto';
            el.style.filter = 'none';
          },
        });
      },
    });
  });

  // Stagger groups: [data-reveal-group] children [data-reveal-item]
  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y: 18, filter: 'blur(6px)' });
    ScrollTrigger.create({
      trigger: group,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: () => {
            items.forEach((i) => {
              i.style.filter = 'none';
              i.style.willChange = 'auto';
            });
          },
        });
      },
    });
  });
}

export function initCountUp(scope: Document | HTMLElement = document) {
  const els = scope.querySelectorAll<HTMLElement>('[data-count-up]');
  if (!els.length) return;
  if (REDUCED()) {
    els.forEach((el) => {
      el.textContent = el.dataset.countUp || el.textContent;
    });
    return;
  }
  els.forEach((el) => {
    const raw = el.dataset.countUp || '0';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : raw.includes('.') ? 1 : 0;
    const suffix = el.dataset.suffix || '';
    const target = parseFloat(raw);
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals) + suffix;
          },
          onComplete: () => {
            el.textContent = target.toFixed(decimals) + suffix;
          },
        });
      },
    });
  });
}
