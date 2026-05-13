/* =============================================
   ハンバーガーメニュー（スマホ用）
   ============================================= */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

// ナビリンクをクリックしたらメニューを閉じる
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'メニューを開く');
  });
});

/* =============================================
   スムーススクロール
   ヘッダーの高さ分オフセットして各セクションへ
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const headerH = document.querySelector('.header').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* =============================================
   FAQアコーディオン
   ============================================= */
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const isCurrentlyOpen = answer.classList.contains('open');

    // 全件閉じる
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(q => q.setAttribute('aria-expanded', 'false'));

    // クリックしたものが閉じていた場合だけ開く
    if (!isCurrentlyOpen) {
      answer.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});

/* =============================================
   スクロールアニメーション（フェードイン）
   IntersectionObserver で要素が画面内に入ったら表示
   ============================================= */
const fadeTargets = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 一度表示したら監視終了
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

fadeTargets.forEach(el => observer.observe(el));
