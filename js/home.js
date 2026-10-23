/* Página inicial: trilhas por nível, contadores e animações de entrada. */
(function () {
  'use strict';

  function setupReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((element) => observer.observe(element));
  }

  function renderLevels() {
    const grid = document.getElementById('level-grid');
    if (!grid || !window.BLABLA_DATA) return;
    const { levels } = window.BLABLA_DATA;

    grid.innerHTML = levels
      .map((level) => {
        const topicCount = window.BLABLA_DATA.countTopics(level.id);
        const questionCount = window.BLABLA_DATA.countQuestions(level.id);
        return `
          <a class="level-card" href="estudar.html?nivel=${encodeURIComponent(level.id)}">
            <span class="level-icon">${App.icon(level.icon)}</span>
            <span class="level-card__range">${App.escapeHTML(level.range)}</span>
            <h3>${App.escapeHTML(level.name)}</h3>
            <p>${App.escapeHTML(level.description)}</p>
            <span class="level-card__meta">
              ${topicCount} temas · ${questionCount} exercícios
              ${App.icon('arrow-right')}
            </span>
          </a>`;
      })
      .join('');
  }

  function renderCounts() {
    if (!window.BLABLA_DATA) return;
    const topicTotal = window.BLABLA_DATA.topics.length;
    const questionTotal = window.BLABLA_DATA.topics.reduce(
      (total, topic) => total + topic.questions.length,
      0
    );
    document.querySelectorAll('[data-total-topics]').forEach((node) => {
      node.textContent = topicTotal;
    });
    document.querySelectorAll('[data-total-questions]').forEach((node) => {
      node.textContent = questionTotal;
    });
  }

  App.ready.then(() => {
    renderLevels();
    renderCounts();
    setupReveal();
  });
})();
