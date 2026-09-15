<template>
  <aside class="navbar">
    <a class="navbar__brand" href="#" aria-label="Tienda Cositas Divinas">
      <img :src="logo" alt="Logo de la Parroquia de la Santa Cruz" class="navbar__logo" />
      <div class="navbar__brand-text">
        <span class="navbar__store">Tienda Cositas Divinas</span>
        <span class="navbar__parish">Parroquia de la Santa Cruz</span>
      </div>
    </a>
   
  </aside>
</template>

<script setup>
import logo from '../../assets/logo.JPG'
</script>

<style>
/* ── Desktop sidebar ────────────────────────────────── */
.navbar {
  align-items: stretch;
  animation: navbar-enter .3s ease-out both;
  background: #fff;
  box-shadow: 10px 0 24px rgba(44, 42, 40, .07);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  height: 100vh;
  padding: 2rem 1.5rem;
  position: relative;
  will-change: transform, opacity;
  z-index: 10;
}

.navbar__brand {
  align-items: center;
  border-bottom: 1px solid var(--line);
  color: var(--accent-strong);
  display: flex;
  flex-direction: column;
  font-weight: 800;
  gap: .35rem;
  padding-bottom: 1.5rem;
  text-align: center;
  transition: opacity .2s ease;
}

.navbar__brand-text {
  display: flex;
  flex-direction: column;
  gap: .15rem;
}

.navbar__logo {
  background: var(--surface);
  border: 2px solid var(--accent);
  border-radius: .75rem;
  box-shadow: 0 6px 16px rgba(44, 42, 40, .1);
  height: 8.5rem;
  object-fit: contain;
  padding: .25rem;
  width: 8.5rem;
  transition: transform .25s ease;
}

.navbar__store { font-size: 1.1rem; line-height: 1.2; }
.navbar__parish { color: var(--muted); font-size: .78rem; font-weight: 600; line-height: 1.35; }

.navbar__nav { display: grid; gap: .35rem; width: 100%; }

.navbar__nav a {
  border-radius: .55rem;
  color: var(--muted);
  font-size: .95rem;
  font-weight: 600;
  min-height: 2.75rem;
  display: flex;
  align-items: center;
  padding: .75rem 1rem;
  position: relative;
  transition: background-color .2s ease, color .2s ease, padding-left .2s ease, transform .15s ease;
}

@media (hover: hover) {
  .navbar__nav a:hover {
    background: var(--soft-accent);
    color: var(--accent-strong);
    padding-left: 1.2rem;
  }
}

.navbar__nav a:active {
  transform: scale(.98);
}

@keyframes navbar-enter {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── Mobile top bar ─────────────────────────────────── */
@media (max-width: 900px) {
  .navbar {
    animation: navbar-enter-mobile .3s ease-out both;
    box-shadow: 0 2px 14px rgba(44, 42, 40, .09);
    flex-direction: column;
    gap: .65rem;
    height: auto;
    padding: .85rem 1rem .65rem;
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .navbar__brand {
    align-items: center;
    border-bottom: none;
    flex-direction: row;
    gap: .85rem;
    padding-bottom: 0;
    text-align: left;
  }

  .navbar__brand-text {
    gap: .1rem;
  }

  /* Significantly larger logo in mobile */
  .navbar__logo {
    border: 2px solid var(--accent);
    border-radius: .7rem;
    box-shadow: 0 4px 12px rgba(44, 42, 40, .14);
    height: 4.2rem;
    width: 4.2rem;
    padding: .2rem;
    flex-shrink: 0;
  }

  .navbar__store {
    font-size: 1.05rem;
    font-weight: 800;
    line-height: 1.2;
  }

  .navbar__parish {
    font-size: .78rem;
    line-height: 1.25;
  }

  .navbar__nav {
    display: flex;
    gap: .3rem;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding-bottom: .2rem;
  }
  .navbar__nav::-webkit-scrollbar { display: none; }

  .navbar__nav a {
    border-radius: 999px;
    flex-shrink: 0;
    font-size: .84rem;
    min-height: 2.5rem;
    padding: .5rem .95rem;
    text-align: center;
    white-space: nowrap;
    background: var(--canvas);
  }

  .navbar__nav a:active {
    background: var(--soft-accent);
    color: var(--accent-strong);
    transform: scale(.96);
  }
}

@keyframes navbar-enter-mobile {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .navbar { animation: none; }
}
</style>
