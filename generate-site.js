#!/usr/bin/env node
/**
 * 精选账号商城 · 纯净电商风格生成器
 * 灵感：Pure Cycles — 干净、明亮、高级感
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DIST_DIR = path.join(__dirname, 'dist');

function loadJSON(name) {
    const fp = path.join(DATA_DIR, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fixImg(url, base) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return base + url;
    return url;
}

// ── SEO 配置 ──
function loadRootJSON(name) {
    const fp = path.join(__dirname, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}
const SEO = loadRootJSON('seo.json') || {};
const SEO_KEYWORDS = SEO.keywords || '';
const SEO_DESC = SEO.description || '';
const SITE_TITLE = SEO.title || '精选账号商城';
const SEO_TITLE_SUFFIX = SEO.titleSuffix || '';
const SEO_AUTHOR = SEO.author || SITE_TITLE;
const SEO_ROBOTS = SEO.robots || 'index, follow';
const SEO_CANONICAL = SEO.canonical || '';
const SEO_OG = SEO.og || {};
const SEO_TWITTER = SEO.twitter || {};
const SEO_JSON_LD = SEO.jsonLd || {};
const SEO_FAVICON = SEO.favicon || '';

// ── CSS ── Pure Cycles 风格：干净、明亮、高级
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap');

:root {
  --white: #ffffff;
  --off-white: #fafafa;
  --cream: #f5f3ef;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --black: #0a0a0a;
  --accent: #1a1a2e;
  --accent-light: #2d2d4a;
  --accent-warm: #e85d3a;
  --accent-warm-light: #ff7a5c;
  --success: #059669;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-display: 'Playfair Display', Georgia, serif;
  --max-w: 1280px;
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  background: var(--white);
  color: var(--gray-800);
  line-height: 1.7;
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }

/* ── ANNOUNCEMENT BAR ── */
.announcement-bar {
  background: var(--black);
  color: var(--white);
  text-align: center;
  padding: 10px 24px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}
.announcement-bar a { color: var(--white); text-decoration: underline; text-underline-offset: 2px; }
.announcement-bar a:hover { opacity: 0.8; }

/* ── HEADER ── */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  transition: box-shadow 0.3s var(--ease);
}
.header.scrolled { box-shadow: 0 1px 12px rgba(0,0,0,0.06); }
.header-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo-area { display: flex; align-items: center; gap: 12px; }
.logo-mark {
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}
.logo-mark img { height: 100%; width: auto; border-radius: 10px; display: block; }
.logo-text {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--black);
  letter-spacing: -0.02em;
}
.header-nav { display: flex; align-items: center; gap: 32px; }
.header-nav a {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--gray-600);
  transition: color 0.2s;
  position: relative;
}
.header-nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--black);
  transition: width 0.3s var(--ease);
}
.header-nav a:hover { color: var(--black); }
.header-nav a:hover::after { width: 100%; }
.header-actions { display: flex; align-items: center; gap: 12px; }
.btn-shop {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 28px;
  border-radius: 0;
  background: var(--black);
  color: var(--white);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.3s var(--ease);
  border: 2px solid var(--black);
}
.btn-shop:hover {
  background: var(--white);
  color: var(--black);
}

/* ── HERO ── */
.hero {
  position: relative;
  background: var(--cream);
  overflow: hidden;
}
.hero-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 580px;
  align-items: center;
}
.hero-content {
  padding: 80px 60px 80px 24px;
}
.hero-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-warm);
  margin-bottom: 20px;
  position: relative;
  padding-left: 28px;
}
.hero-eyebrow::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 2px;
  background: var(--accent-warm);
}
.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--black);
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}
.hero-desc {
  font-size: 1.05rem;
  color: var(--gray-500);
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 460px;
}
.hero-actions { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 40px;
  background: var(--black);
  color: var(--white);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 2px solid var(--black);
  transition: all 0.3s var(--ease);
  cursor: pointer;
}
.btn-primary:hover {
  background: var(--white);
  color: var(--black);
}
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 40px;
  background: transparent;
  color: var(--black);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 2px solid var(--gray-300);
  transition: all 0.3s var(--ease);
  cursor: pointer;
}
.btn-secondary:hover { border-color: var(--black); }

.hero-visual {
  position: relative;
  height: 100%;
  min-height: 580px;
  overflow: hidden;
}
.hero-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--cream) 0%, transparent 30%);
}

/* ── TRUST BAR ── */
.trust-bar {
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  padding: 28px 0;
}
.trust-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.trust-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}
.trust-text h4 {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 1px;
}
.trust-text p {
  font-size: 0.72rem;
  color: var(--gray-500);
}

/* ── STATS ── */
.stats-section { padding: 60px 0; background: var(--white); }
.stats-row {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.stat-card {
  text-align: center;
  padding: 32px 40px;
  background: var(--gray-50);
  border-radius: 16px;
  min-width: 160px;
  transition: all 0.3s var(--ease);
}
.stat-card:hover { background: var(--gray-100); transform: translateY(-2px); }
.stat-num {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--black);
  line-height: 1;
  margin-bottom: 8px;
}
.stat-label {
  font-size: 0.75rem;
  color: var(--gray-500);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ── SECTION HEADER ── */
.section-header {
  text-align: center;
  margin-bottom: 48px;
}
.section-eyebrow {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-warm);
  margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 700;
  color: var(--black);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.section-desc {
  font-size: 1rem;
  color: var(--gray-500);
  max-width: 520px;
  margin: 0 auto;
}

/* ── FILTER ── */
.filter-section { padding: 48px 0 0; }
.filter-bar {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-btn {
  padding: 10px 28px;
  border-radius: 0;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.25s var(--ease);
  background: transparent;
  color: var(--gray-500);
  border: 1.5px solid var(--gray-300);
  user-select: none;
}
.filter-btn:hover {
  color: var(--black);
  border-color: var(--black);
}
.filter-btn.active {
  background: var(--black);
  color: var(--white);
  border-color: var(--black);
}

/* ── PRODUCTS ── */
.products-section { padding: 40px 0 80px; }
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.product-card {
  position: relative;
  display: block;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s var(--ease);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  border-color: transparent;
}

.card-img-wrap {
  position: relative;
  overflow: hidden;
  height: 220px;
  background: var(--gray-100);
}
.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}
.product-card:hover .card-img-wrap img { transform: scale(1.06); }

.card-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  padding: 5px 14px;
  border-radius: 0;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--black);
  color: var(--white);
}

.card-body { padding: 20px; }
.card-cat {
  font-size: 0.68rem;
  color: var(--gray-400);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 8px;
}
.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 16px;
  color: var(--black);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.85em;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--gray-100);
}
.card-price {
  font-family: var(--font-sans);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--black);
}
.card-price .from {
  font-size: 0.68rem;
  font-weight: 400;
  color: var(--gray-400);
  margin-right: 2px;
}
.card-cta {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-500);
  font-size: 0.9rem;
  transition: all 0.3s var(--ease);
  border: 1px solid var(--gray-200);
}
.product-card:hover .card-cta {
  background: var(--black);
  color: var(--white);
  border-color: var(--black);
}

/* ── FEATURES ── */
.features-section {
  padding: 80px 0;
  background: var(--gray-50);
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
}
.feature-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 16px;
  padding: 40px 28px;
  text-align: center;
  transition: all 0.3s var(--ease);
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
  border-color: transparent;
}
.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto 20px;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s;
}
.feature-card:hover .feature-icon {
  background: var(--black);
  border-color: var(--black);
  transform: scale(1.05);
}
.feature-card:hover .feature-icon span { filter: grayscale(1) brightness(10); }
.feature-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--black);
}
.feature-card p {
  font-size: 0.85rem;
  color: var(--gray-500);
  line-height: 1.6;
}

/* ── CTA BANNER ── */
.cta-section { padding: 80px 0; }
.cta-banner {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 80px 40px;
  background: var(--black);
  color: var(--white);
  text-align: center;
}
.cta-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(232,93,58,0.15), transparent 70%);
  pointer-events: none;
}
.cta-banner h2 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  margin-bottom: 16px;
  position: relative;
  letter-spacing: -0.02em;
}
.cta-banner p {
  color: rgba(255,255,255,0.6);
  font-size: 1rem;
  margin-bottom: 36px;
  position: relative;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
.btn-white {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 44px;
  background: var(--white);
  color: var(--black);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 2px solid var(--white);
  transition: all 0.3s var(--ease);
  position: relative;
  cursor: pointer;
}
.btn-white:hover {
  background: transparent;
  color: var(--white);
}

/* ── FOOTER ── */
.footer {
  background: var(--gray-50);
  border-top: 1px solid var(--gray-200);
  padding: 60px 0 40px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}
.footer-brand p {
  color: var(--gray-500);
  font-size: 0.85rem;
  line-height: 1.8;
  margin-top: 16px;
  max-width: 300px;
}
.footer-col h4 {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--black);
  margin-bottom: 20px;
}
.footer-col a {
  display: block;
  color: var(--gray-500);
  font-size: 0.85rem;
  margin-bottom: 12px;
  transition: color 0.2s;
}
.footer-col a:hover { color: var(--black); }
.footer-bottom {
  border-top: 1px solid var(--gray-200);
  padding-top: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.footer-bottom p {
  color: var(--gray-400);
  font-size: 0.78rem;
}
.footer-bottom-links { display: flex; gap: 24px; }
.footer-bottom-links a {
  color: var(--gray-400);
  font-size: 0.78rem;
  transition: color 0.2s;
}
.footer-bottom-links a:hover { color: var(--black); }

/* ── ANIMATIONS ── */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s var(--ease-out);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-visual { display: none; }
  .hero-content { padding: 60px 24px; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
}

@media (max-width: 768px) {
  .header-nav { display: none; }
  .header-inner { height: 60px; }
  .hero-content { padding: 40px 16px; }
  .hero h1 { font-size: 2rem; }
  .hero-desc { font-size: 0.95rem; }
  .hero-actions { flex-direction: column; align-items: stretch; }
  .btn-primary, .btn-secondary { text-align: center; justify-content: center; }
  .trust-inner { gap: 24px; }
  .trust-item { flex: 1; min-width: 140px; }
  .stats-row { gap: 12px; }
  .stat-card { padding: 24px 20px; min-width: 120px; }
  .stat-num { font-size: 1.8rem; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .card-img-wrap { height: 160px; }
  .card-body { padding: 14px; }
  .card-title { font-size: 0.85rem; min-height: auto; }
  .card-price { font-size: 1rem; }
  .features-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
  .feature-card { padding: 28px 16px; }
  .cta-banner { padding: 50px 24px; }
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
  .footer-bottom { flex-direction: column; text-align: center; }
  .container { padding: 0 16px; }
  .filter-bar { gap: 6px; }
  .filter-btn { padding: 8px 18px; font-size: 0.72rem; }
}

@media (max-width: 480px) {
  .products-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .card-img-wrap { height: 130px; }
  .card-body { padding: 10px; }
  .card-tag { font-size: 0.6rem; padding: 4px 10px; }
  .card-cta { width: 28px; height: 28px; font-size: 0.75rem; }
  .stat-card { min-width: 100px; padding: 20px 14px; }
  .stat-num { font-size: 1.5rem; }
  .logo-text { font-size: 1.1rem; }
  .btn-shop { padding: 8px 18px; font-size: 0.75rem; }
}
`;

const JS = `
function filterCategory(id, el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.product-card').forEach((c, i) => {
    if (id === 'all' || c.dataset.cat == id) {
      c.style.display = '';
      c.style.opacity = '0'; c.style.transform = 'translateY(16px)';
      setTimeout(() => { c.style.transition = 'all .4s cubic-bezier(0.25,0.46,0.45,0.94)'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * 50);
    } else { c.style.display = 'none'; }
  });
}
window.addEventListener('scroll', () => { document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20); });
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
`;

function main() {
    const config = loadJSON('config.json') || {};
    const categories = loadJSON('categories.json') || [];
    const products = loadJSON('products.json') || [];
    const meta = loadJSON('meta.json') || {};

    if (!products.length) { console.error('❌ 没有商品数据'); process.exit(1); }

    const siteUrl = meta.siteUrl || process.env.SITE_URL;
    const siteName = SITE_TITLE;
    const GITHUB_PAGES_URL = process.env.GITHUB_PAGES_URL;

    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

    function shortCatName(name) {
        return name
            .replace(/谷歌美国电话\/?/i, '')
            .replace(/GoogleVoice\s*\/?\s*GV靓号/i, 'GV靓号')
            .replace(/谷歌邮箱\s*\/?\s*油管\s*\/?\s*Google\s*\/?\s*Gmail/i, '谷歌邮箱')
            .replace(/苹果id\s*\/?\s*Apple\s*id\s*\/?\s*AppStore/i, '苹果ID')
            .replace(/服务类/i, '服务类')
            .trim() || name;
    }

    const activeCats = categories.filter(c => products.some(p => p.category_id === c.id));
    const catBtns = activeCats
        .sort((a, b) => (b.sort || 0) - (a.sort || 0))
        .map(c => `<div class="filter-btn" onclick="filterCategory(${c.id}, this)">${esc(shortCatName(c.name))}</div>`)
        .join('\n            ');

    const cards = products.filter(p => p.active !== 0).sort((a, b) => (b.sort||0) - (a.sort||0)).map((p, i) => {
        const cat = categories.find(c => c.id === p.category_id);
        const catName = cat ? shortCatName(cat.name) : '';
        const img = p.image_url ? fixImg(p.image_url, siteUrl) : '';
        const variants = p.variants || [];
        const minPrice = variants.length ? Math.min(...variants.map(v => v.price)) : 0;
        const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
        const cleanTag = t => t.replace(/b[12]#[0-9a-fA-F]{3,6}/g, '').replace(/#[0-9a-fA-F]{3,6}$/g, '').replace(/\s+/g, ' ').trim();
        const tagLabel = cleanTag(tags[0] || '');

        return `
            <a class="product-card reveal" href="${siteUrl}/product?id=${p.id}" target="_blank" rel="noopener" data-cat="${p.category_id}">
                <div class="card-img-wrap">
                    ${img ? `<img src="${esc(img)}" alt="${esc(p.name)}" loading="lazy">` : ''}
                    ${tagLabel ? `<div class="card-tag">${esc(tagLabel)}</div>` : ''}
                </div>
                <div class="card-body">
                    <div class="card-cat">${esc(catName)}</div>
                    <div class="card-title">${esc(p.name)}</div>
                    <div class="card-footer">
                        <div class="card-price"><span class="from">起</span><span class="amount">¥${minPrice.toFixed(2)}</span></div>
                        <div class="card-cta">→</div>
                    </div>
                </div>
            </a>`;
    }).join('\n');

    const heroImg = products[0]?.image_url ? fixImg(products[0].image_url, siteUrl) : '';

    const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", "name": siteName, "description": SEO_DESC, "url": GITHUB_PAGES_URL, "potentialAction": { "@type": "SearchAction", "target": `${siteUrl}/product?id={search_term_string}`, "query-input": "required name=search_term_string" } };
    const itemListLd = { "@context": "https://schema.org", "@type": "ItemList", "itemListElement": products.filter(p => p.active !== 0).map((p, i) => ({ "@type": "ListItem", "position": i + 1, "item": { "@type": "Product", "name": p.name, "url": `${siteUrl}/product?id=${p.id}`, "image": p.image_url ? fixImg(p.image_url, siteUrl) : '', "offers": { "@type": "Offer", "price": p.variants?.length ? Math.min(...p.variants.map(v => v.price)) : 0, "priceCurrency": "CNY" } } })) };

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(siteName)}${SEO_TITLE_SUFFIX ? ' - ' + esc(SEO_TITLE_SUFFIX) : ''}</title>
    <meta name="description" content="${esc(SEO_DESC)}">
    <meta name="keywords" content="${esc(SEO_KEYWORDS)}">
    <meta name="author" content="${esc(SEO_AUTHOR)}">
    <meta name="robots" content="${esc(SEO_ROBOTS)}">
    <meta name="googlebot" content="${esc(SEO_ROBOTS)}">
    ${SEO_CANONICAL ? `<link rel="canonical" href="${esc(SEO_CANONICAL)}">` : ''}
    <meta property="og:type" content="${esc(SEO_OG.type || 'website')}">
    <meta property="og:url" content="${esc(SEO_OG.url || GITHUB_PAGES_URL)}">
    <meta property="og:title" content="${esc(siteName)}">
    <meta property="og:description" content="${esc(SEO_DESC)}">
    ${heroImg ? `<meta property="og:image" content="${esc(heroImg)}">` : ''}
    <meta property="og:locale" content="${esc(SEO_OG.locale || 'zh_CN')}">
    <meta property="og:site_name" content="${esc(SEO_OG.siteName || siteName)}">
    <meta name="twitter:card" content="${esc(SEO_TWITTER.card || 'summary_large_image')}">
    <meta name="twitter:title" content="${esc(siteName)}">
    <meta name="twitter:description" content="${esc(SEO_DESC)}">
    ${heroImg ? `<meta name="twitter:image" content="${esc(heroImg)}">` : ''}
    <script type="application/ld+json">${JSON.stringify({...SEO_JSON_LD, ...jsonLd})}</script>
    <script type="application/ld+json">${JSON.stringify(itemListLd)}</script>
    ${SEO_FAVICON ? `<link rel="icon" href="${esc(SEO_FAVICON)}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>${CSS}</style>
</head>
<body>

<div class="announcement-bar">
    全场自动发货 · 即买即用 · 质保无忧 — <a href="${siteUrl}" target="_blank" rel="noopener">立即选购</a>
</div>

<header class="header" id="header">
    <div class="header-inner">
        <div class="logo-area">
            <div class="logo-mark">
                <img src="${esc(fixImg(meta.siteLogo || '', siteUrl))}" alt="${esc(siteName)}">
            </div>
            <div class="logo-text">${esc(siteName)}</div>
        </div>
        <nav class="header-nav">
            <a href="#products">全部商品</a>
            <a href="#features">为什么选择我们</a>
            <a href="${siteUrl}" target="_blank" rel="noopener">帮助中心</a>
        </nav>
        <div class="header-actions">
            <a href="${siteUrl}" target="_blank" rel="noopener" class="btn-shop">进入商城</a>
        </div>
    </div>
</header>

<section class="hero">
    <div class="hero-inner">
        <div class="hero-content">
            <div class="hero-eyebrow">专业数字账号平台</div>
            <h1>精选优质<br>数字账号资源</h1>
            <p class="hero-desc">我们甄选每一枚账号，确保品质可靠、安全可用。从 Google Voice 靓号到 Gmail 老号，从 Apple ID 到专属服务——你想要的，这里都有。</p>
            <div class="hero-actions">
                <a href="${siteUrl}" target="_blank" rel="noopener" class="btn-primary">立即选购</a>
                <a href="#products" class="btn-secondary">浏览商品</a>
            </div>
        </div>
        <div class="hero-visual">
            ${heroImg ? `<img src="${esc(heroImg)}" alt="${esc(siteName)}">` : ''}
            <div class="hero-visual-overlay"></div>
        </div>
    </div>
</section>

<div class="trust-bar">
    <div class="trust-inner">
        <div class="trust-item">
            <div class="trust-icon">⚡</div>
            <div class="trust-text"><h4>即时发货</h4><p>付款即发，无需等待</p></div>
        </div>
        <div class="trust-item">
            <div class="trust-icon">🛡️</div>
            <div class="trust-text"><h4>品质保障</h4><p>质保期内免费更换</p></div>
        </div>
        <div class="trust-item">
            <div class="trust-icon">💎</div>
            <div class="trust-text"><h4>源头价格</h4><p>一手资源，无中间差价</p></div>
        </div>
        <div class="trust-item">
            <div class="trust-icon">🎯</div>
            <div class="trust-text"><h4>精选靓号</h4><p>支持自选号码</p></div>
        </div>
    </div>
</div>

<section class="stats-section">
    <div class="container">
        <div class="stats-row">
            <div class="stat-card reveal">
                <div class="stat-num">${categories.length}</div>
                <div class="stat-label">商品分类</div>
            </div>
            <div class="stat-card reveal">
                <div class="stat-num">${products.filter(p=>p.active!==0).length}</div>
                <div class="stat-label">精选商品</div>
            </div>
            <div class="stat-card reveal">
                <div class="stat-num">${products.reduce((s,p) => s + (p.variants?.length||0), 0)}</div>
                <div class="stat-label">可选规格</div>
            </div>
            <div class="stat-card reveal">
                <div class="stat-num">24h</div>
                <div class="stat-label">自动发货</div>
            </div>
        </div>
    </div>
</section>

<section class="filter-section" id="products">
    <div class="container">
        <div class="section-header">
            <div class="section-eyebrow">Our Products</div>
            <h2 class="section-title">全部商品</h2>
            <p class="section-desc">精选各类优质数字账号，满足你的不同需求</p>
        </div>
        <div class="filter-bar">
            <div class="filter-btn active" onclick="filterCategory('all', this)">全部</div>
            ${catBtns}
        </div>
    </div>
</section>

<section class="products-section">
    <div class="container">
        <div class="products-grid">
            ${cards}
        </div>
    </div>
</section>

<section class="features-section" id="features">
    <div class="container">
        <div class="section-header">
            <div class="section-eyebrow">Why Choose Us</div>
            <h2 class="section-title">为什么选择我们</h2>
            <p class="section-desc">数千用户的共同选择，品质与服务的双重保障</p>
        </div>
        <div class="features-grid">
            <div class="feature-card reveal">
                <div class="feature-icon"><span>⚡</span></div>
                <h3>全自动发货</h3>
                <p>付款后系统自动发货，24小时不间断，无需等待人工处理，即买即用。</p>
            </div>
            <div class="feature-card reveal">
                <div class="feature-icon"><span>🛡️</span></div>
                <h3>品质保障</h3>
                <p>每个账号均经过严格筛选与验证，质保期内首登出现问题可免费更换。</p>
            </div>
            <div class="feature-card reveal">
                <div class="feature-icon"><span>💎</span></div>
                <h3>源头直供</h3>
                <p>一手资源直接供应，去除中间环节，让你以最优惠的价格获得优质账号。</p>
            </div>
            <div class="feature-card reveal">
                <div class="feature-icon"><span>🎯</span></div>
                <h3>靓号可选</h3>
                <p>支持自选号码模式，无论是 AAA 型还是特殊组合，总有一款适合你。</p>
            </div>
        </div>
    </div>
</section>

<section class="cta-section">
    <div class="container">
        <div class="cta-banner reveal">
            <h2>找到你需要的账号了吗？</h2>
            <p>全场自动发货，安全可靠，品质保障。立即前往商城选购。</p>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="btn-white">立即前往商城</a>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <div class="logo-area">
                    <div class="logo-mark">
                        <img src="${esc(fixImg(meta.siteLogo || '', siteUrl))}" alt="${esc(siteName)}">
                    </div>
                    <div class="logo-text">${esc(siteName)}</div>
                </div>
                <p>专业数字账号交易平台，提供高品质 Gmail、Google Voice 靓号、Apple ID 等数字商品。全场自动发货，即买即用。</p>
            </div>
            <div class="footer-col">
                <h4>商品</h4>
                ${activeCats.map(c => `<a href="${siteUrl}" target="_blank" rel="noopener">${esc(shortCatName(c.name))}</a>`).join('\n                ')}
            </div>
            <div class="footer-col">
                <h4>服务</h4>
                <a href="${siteUrl}" target="_blank" rel="noopener">帮助中心</a>
                <a href="${siteUrl}" target="_blank" rel="noopener">售后保障</a>
                <a href="${siteUrl}" target="_blank" rel="noopener">关于我们</a>
            </div>
            <div class="footer-col">
                <h4>联系方式</h4>
                <a href="${siteUrl}" target="_blank" rel="noopener">在线客服</a>
                <a href="${siteUrl}" target="_blank" rel="noopener">商城首页</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© ${new Date().getFullYear()} ${esc(siteName)} · 所有商品均为虚拟数字商品</p>
            <div class="footer-bottom-links">
                <a href="${siteUrl}" target="_blank" rel="noopener">商城原址</a>
                <a href="${siteUrl}" target="_blank" rel="noopener">服务条款</a>
            </div>
        </div>
    </div>
</footer>

<script>${JS}</script>
</body>
</html>`;

    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
    console.log(`✅ dist/index.html (${(Buffer.byteLength(html)/1024).toFixed(1)}KB)`);
    console.log(`   商品: ${products.filter(p=>p.active!==0).length} 个`);
    console.log(`   分类: ${activeCats.length} 个`);
    console.log(`   风格: Pure Cycles 纯净电商风 · 白色基调 · 高级感排版`);
    console.log(`   链接: 全部指向 ${siteUrl}/product?id=xxx`);
}

main();
