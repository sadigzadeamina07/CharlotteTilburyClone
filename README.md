<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Beauty & Cosmetics — Charlotte Tilbury Inspired</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold:       #C9A96E;
    --gold-dim:   rgba(201,169,110,0.18);
    --gold-line:  rgba(201,169,110,0.28);
    --cream:      #FAF5EE;
    --cream-dim:  rgba(250,245,238,0.65);
    --cream-faint:rgba(250,245,238,0.38);
    --blush:      #E8C4C4;
    --bg:         #0D0808;
    --bg2:        #130c0c;
    --rouge:      #5a1f1f;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--cream);
    font-family: 'EB Garamond', serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--gold-line); border-radius: 2px; }

  /* ── NOISE OVERLAY ── */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 48px 64px;
    overflow: hidden;
  }

  .hero-glow {
    position: absolute;
    width: 600px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(90,31,31,0.55) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -60%);
    pointer-events: none;
  }

  /* corner frames */
  .frame { position: absolute; inset: 32px; pointer-events: none; }
  .frame::before, .frame::after,
  .frame > span::before, .frame > span::after {
    content: '';
    position: absolute;
    width: 40px; height: 40px;
    border-color: var(--gold);
    border-style: solid;
    opacity: 0.55;
  }
  .frame::before  { top: 0;    left: 0;  border-width: 1px 0 0 1px; }
  .frame::after   { top: 0;    right: 0; border-width: 1px 1px 0 0; }
  .frame > span::before { bottom: 0; left: 0;  border-width: 0 0 1px 1px; }
  .frame > span::after  { bottom: 0; right: 0; border-width: 0 1px 1px 0; }

  /* inner thin border */
  .frame-inner {
    position: absolute;
    inset: 44px;
    border: 0.5px solid rgba(201,169,110,0.1);
    pointer-events: none;
  }

  .eyebrow {
    position: relative;
    display: flex;
    align-items: center;
    gap: 20px;
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.45em;
    color: var(--gold);
    opacity: 0.65;
    margin-bottom: 36px;
    animation: fadeUp 1.2s ease both;
  }
  .eyebrow::before, .eyebrow::after {
    content: '';
    display: block;
    width: 56px; height: 0.5px;
    background: linear-gradient(to right, transparent, var(--gold));
    opacity: 0.6;
  }
  .eyebrow::before { transform: scaleX(-1); }

  .hero-title {
    position: relative;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(38px, 7vw, 72px);
    letter-spacing: 0.06em;
    line-height: 1.1;
    text-align: center;
    color: var(--cream);
    animation: fadeUp 1.2s 0.15s ease both;
  }
  .hero-title em {
    font-style: italic;
    color: var(--gold);
    font-weight: 300;
  }

  .hero-sub {
    position: relative;
    margin-top: 20px;
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: clamp(13px, 2vw, 16px);
    color: var(--blush);
    opacity: 0.6;
    letter-spacing: 0.05em;
    text-align: center;
    animation: fadeUp 1.2s 0.3s ease both;
  }

  .hero-divider {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 48px;
    animation: fadeUp 1.2s 0.45s ease both;
  }
  .hero-divider span { font-size: 16px; color: var(--gold); opacity: 0.45; }
  .hdl {
    display: block;
    width: 72px; height: 0.5px;
    background: linear-gradient(to right, transparent, var(--gold));
    opacity: 0.5;
  }
  .hdl.rev { transform: scaleX(-1); }

  /* ── PILLS ── */
  .pills-section {
    position: relative;
    padding: 0 40px 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  .pills-connector {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    opacity: 0.3;
    margin-bottom: 16px;
  }
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    max-width: 600px;
  }
  .pill {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.18em;
    color: var(--gold);
    border: 0.5px solid var(--gold-line);
    padding: 7px 18px;
    background: var(--gold-dim);
    transition: background 0.3s, border-color 0.3s, transform 0.2s;
    cursor: default;
  }
  .pill:hover {
    background: rgba(201,169,110,0.14);
    border-color: rgba(201,169,110,0.6);
    transform: translateY(-1px);
  }

  /* ── MAIN CONTENT ── */
  .content {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 40px 80px;
  }

  /* ── SECTION ── */
  .section { margin-bottom: 64px; }

  .sec-head {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 36px;
  }
  .sec-num {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 300;
    font-size: 42px;
    color: var(--gold);
    opacity: 0.2;
    line-height: 1;
    min-width: 36px;
  }
  .sec-label {
    font-family: 'Cinzel', serif;
    font-size: 9.5px;
    letter-spacing: 0.32em;
    color: var(--gold);
    opacity: 0.8;
    white-space: nowrap;
  }
  .sec-rule {
    flex: 1;
    height: 0.5px;
    background: linear-gradient(to right, rgba(201,169,110,0.28), transparent);
  }

  /* ── LANG TABS ── */
  .tabs {
    display: flex;
    gap: 0;
    border-bottom: 0.5px solid rgba(201,169,110,0.14);
    margin-bottom: 32px;
  }
  .tab {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.3em;
    color: rgba(201,169,110,0.35);
    padding: 9px 24px 11px;
    border: none;
    background: none;
    cursor: pointer;
    border-bottom: 1.5px solid transparent;
    margin-bottom: -0.5px;
    transition: color 0.25s, border-color 0.25s;
  }
  .tab.active {
    color: var(--gold);
    border-bottom-color: var(--gold);
  }
  .tab:hover:not(.active) { color: rgba(201,169,110,0.6); }

  /* ── ABOUT TEXT ── */
  .about-body {
    font-family: 'EB Garamond', serif;
    font-size: 17.5px;
    line-height: 1.9;
    color: var(--cream-dim);
    border-left: 1px solid rgba(201,169,110,0.22);
    padding-left: 28px;
  }
  [data-lang="az"] { display: none; }

  /* ── FEATURE GRID ── */
  .feat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(201,169,110,0.1);
    border: 0.5px solid rgba(201,169,110,0.12);
  }
  .feat-card {
    background: var(--bg);
    padding: 32px 28px;
    transition: background 0.3s;
    position: relative;
    overflow: hidden;
  }
  .feat-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 28px; right: 28px;
    height: 0.5px;
    background: transparent;
    transition: background 0.3s;
  }
  .feat-card:hover { background: rgba(201,169,110,0.035); }
  .feat-card:hover::after { background: rgba(201,169,110,0.15); }

  .feat-glyph {
    display: block;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 28px;
    color: var(--gold);
    opacity: 0.4;
    margin-bottom: 14px;
    transition: opacity 0.3s;
  }
  .feat-card:hover .feat-glyph { opacity: 0.7; }

  .feat-name {
    font-family: 'Cinzel', serif;
    font-size: 9.5px;
    letter-spacing: 0.22em;
    color: var(--cream);
    margin-bottom: 10px;
    opacity: 0.9;
  }
  .feat-desc {
    font-family: 'EB Garamond', serif;
    font-size: 15px;
    color: var(--cream-faint);
    line-height: 1.65;
  }

  /* ── STEPS ── */
  .steps { display: flex; flex-direction: column; }
  .step {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    padding: 26px 0;
    border-bottom: 0.5px solid rgba(201,169,110,0.1);
    transition: padding-left 0.3s;
  }
  .step:last-child { border-bottom: none; }
  .step:hover { padding-left: 6px; }

  .step-roman {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 300;
    font-size: 32px;
    color: var(--gold);
    opacity: 0.3;
    line-height: 1;
    min-width: 28px;
    padding-top: 4px;
    transition: opacity 0.3s;
  }
  .step:hover .step-roman { opacity: 0.65; }

  .step-meta {}
  .step-action {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.2em;
    color: rgba(201,169,110,0.5);
    margin-bottom: 8px;
  }
  .step-code {
    font-family: 'Courier New', monospace;
    font-size: 13px;
    color: rgba(250,245,238,0.72);
    background: rgba(201,169,110,0.06);
    border: 0.5px solid rgba(201,169,110,0.18);
    padding: 8px 16px;
    display: inline-block;
    letter-spacing: 0.04em;
    transition: background 0.3s, border-color 0.3s;
  }
  .step:hover .step-code {
    background: rgba(201,169,110,0.1);
    border-color: rgba(201,169,110,0.35);
  }

  /* ── FOOTER ── */
  .footer {
    border-top: 0.5px solid rgba(201,169,110,0.14);
    padding: 56px 40px 48px;
    text-align: center;
    position: relative;
  }
  .footer-quote {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: clamp(17px, 2.5vw, 22px);
    color: var(--blush);
    opacity: 0.65;
    margin-bottom: 20px;
    letter-spacing: 0.03em;
  }
  .footer-credit {
    font-family: 'Cinzel', serif;
    font-size: 8.5px;
    letter-spacing: 0.38em;
    color: var(--gold);
    opacity: 0.28;
  }
  .footer-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    margin: 32px 0 0;
  }
  .footer-ornament span {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    color: var(--gold);
    opacity: 0.25;
  }
  .fol {
    display: block;
    width: 64px; height: 0.5px;
    background: var(--gold);
    opacity: 0.18;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .section {
    animation: fadeUp 0.9s ease both;
  }
  .section:nth-child(1) { animation-delay: 0.1s; }
  .section:nth-child(2) { animation-delay: 0.2s; }
  .section:nth-child(3) { animation-delay: 0.3s; }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .hero { padding: 64px 28px 48px; min-height: auto; padding-top: 100px; }
    .frame { inset: 16px; }
    .frame-inner { inset: 28px; }
    .content { padding: 0 20px 60px; }
    .feat-grid { grid-template-columns: 1fr; }
    .feat-card { padding: 24px 20px; }
    .pills-section { padding: 0 20px 48px; }
    .step { gap: 16px; }
  }
</style>
</head>
<body>

<!-- HERO -->
<section class="hero">
  <div class="hero-glow"></div>
  <div class="frame"><span></span></div>
  <div class="frame-inner"></div>

  <div class="eyebrow">✦ BEAUTY &amp; COSMETICS ✦</div>

  <h1 class="hero-title">
    Charlotte Tilbury<br/>
    <em>Inspired Platform</em>
  </h1>

  <p class="hero-sub">
    A premium frontend for a luxury beauty e-commerce experience<br/>
    <span style="font-size:0.85em; opacity:0.6;">Premium səviyyəli kosmetika e-ticarət platforması</span>
  </p>

  <div class="hero-divider">
    <span class="hdl rev"></span>
    <span>✦</span>
    <span class="hdl"></span>
  </div>
</section>

<!-- PILLS -->
<div class="pills-section">
  <div class="pills-connector"></div>
  <div class="pills">
    <div class="pill">React v19</div>
    <div class="pill">Tailwind CSS</div>
    <div class="pill">Vite</div>
    <div class="pill">Swiper</div>
    <div class="pill">Axios</div>
  </div>
</div>

<!-- CONTENT -->
<div class="content">

  <!-- ABOUT -->
  <div class="section">
    <div class="sec-head">
      <span class="sec-num">01</span>
      <span class="sec-label">About the Project</span>
      <div class="sec-rule"></div>
    </div>

    <div class="tabs">
      <button class="tab active" onclick="setLang('en',this)">EN</button>
      <button class="tab" onclick="setLang('az',this)">AZ</button>
    </div>

    <p class="about-body" data-lang="en">
      A high-end, <strong style="color:var(--gold);font-weight:500;">Charlotte Tilbury</strong>-inspired frontend
      for a luxury beauty web application. Featuring a responsive, aesthetic design optimised for
      an elegant shopping experience — crafted with the finest web technologies for optimal performance and visual refinement.
    </p>
    <p class="about-body" data-lang="az">
      Bu layihə <strong style="color:var(--gold);font-weight:500;">Charlotte Tilbury</strong> konseptindən
      ilhamlanaraq yaradılmış, premium səviyyəli kosmetika e-ticarət platformasının frontend hissəsidir.
      Layihə estetik və müasir istifadəçi təcrübəsinə əsaslanır.
    </p>
  </div>

  <!-- FEATURES -->
  <div class="section">
    <div class="sec-head">
      <span class="sec-num">02</span>
      <span class="sec-label">Features</span>
      <div class="sec-rule"></div>
    </div>

    <div class="feat-grid">
      <div class="feat-card">
        <span class="feat-glyph">✦</span>
        <div class="feat-name">Premium UI / UX</div>
        <p class="feat-desc" data-lang="en">Sophisticated design with seamless sliders and fluid animations powered by Swiper.</p>
        <p class="feat-desc" data-lang="az">Yüksək keyfiyyətli interfeys və axıcı animasiyalar.</p>
      </div>
      <div class="feat-card">
        <span class="feat-glyph">⟡</span>
        <div class="feat-name">Categorization</div>
        <p class="feat-desc" data-lang="en">Structured sections for makeup, skincare, and foundation products.</p>
        <p class="feat-desc" data-lang="az">Makiyaj, dəriyə qulluq və tonal kremlər üçün xüsusi bölmələr.</p>
      </div>
      <div class="feat-card">
        <span class="feat-glyph">♡</span>
        <div class="feat-name">Wishlist</div>
        <p class="feat-desc" data-lang="en">Interactive product saving via heart icons for a curated shopping experience.</p>
        <p class="feat-desc" data-lang="az">Məhsulların ürək butonları ilə seçilmişlərə əlavə edilməsi.</p>
      </div>
      <div class="feat-card">
        <span class="feat-glyph">◇</span>
        <div class="feat-name">Modern Architecture</div>
        <p class="feat-desc" data-lang="en">Built with industry-standard web technologies for speed and reliability.</p>
        <p class="feat-desc" data-lang="az">Sürətli və etibarlı performans üçün ən son rəsmi veb alətlər.</p>
      </div>
    </div>
  </div>

  <!-- GETTING STARTED -->
  <div class="section">
    <div class="sec-head">
      <span class="sec-num">03</span>
      <span class="sec-label">Getting Started</span>
      <div class="sec-rule"></div>
    </div>

    <div class="steps">
      <div class="step">
        <span class="step-roman">I</span>
        <div class="step-meta">
          <div class="step-action">Clone the repository · Layihəni yükləyin</div>
          <span class="step-code">git clone &lt;repo-url&gt;</span>
        </div>
      </div>
      <div class="step">
        <span class="step-roman">II</span>
        <div class="step-meta">
          <div class="step-action">Install dependencies · Paketləri quraşdırın</div>
          <span class="step-code">npm install</span>
        </div>
      </div>
      <div class="step">
        <span class="step-roman">III</span>
        <div class="step-meta">
          <div class="step-action">Launch development server · Serveri başladın</div>
          <span class="step-code">npm run dev</span>
        </div>
      </div>
    </div>
  </div>

</div>

<!-- FOOTER -->
<footer class="footer">
  <p class="footer-quote">"Life is short, but your lashes shouldn't be."</p>
  <p class="footer-credit">Developed for elegance and performance &nbsp;·&nbsp; Zəriflik və performans üçün yaradıldı</p>
  <div class="footer-ornament">
    <span class="fol"></span>
    <span>✦</span>
    <span class="fol"></span>
  </div>
</footer>

<script>
  function setLang(lang, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = el.dataset.lang === lang ? '' : 'none';
    });
  }
</script>

</body>
</html>
