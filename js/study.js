/* Conteúdos: filtros por nível, matéria e busca. */
(function () {
  'use strict';

  const DATA = window.BLABLA_DATA;
  const state = {
    level: 'all',
    subject: 'all',
    search: ''
  };

  function isValidLevel(value) {
    return value === 'all' || DATA.levels.some((level) => level.id === value);
  }

  function isValidSubject(value) {
    return value === 'all' || DATA.subjects.some((subject) => subject.id === value);
  }

  function setupFromUrl() {
    const level = App.getParam('nivel', 'all');
    const subject = App.getParam('materia', 'all');
    state.level = isValidLevel(level) ? level : 'all';
    state.subject = isValidSubject(subject) ? subject : 'all';
  }

  function updateUrl() {
    const params = new URLSearchParams();
    if (state.level !== 'all') params.set('nivel', state.level);
    if (state.subject !== 'all') params.set('materia', state.subject);
    const query = params.toString();
    window.history.replaceState({}, '', `estudar.html${query ? `?${query}` : ''}`);
  }

  function renderLevelPills() {
    const container = document.getElementById('level-pills');
    if (!container) return;
    const options = [{ id: 'all', name: 'Todos', icon: 'layers' }, ...DATA.levels];
    container.innerHTML = options
      .map(
        (level) => `
          <button class="level-pill ${state.level === level.id ? 'is-active' : ''}" type="button"
            data-level="${level.id}" aria-pressed="${state.level === level.id}">
            ${App.icon(level.icon || 'layers')}
            ${App.escapeHTML(level.name)}
          </button>`
      )
      .join('');
  }

  function updateSubjectTabs() {
    document.querySelectorAll('[data-subject]').forEach((button) => {
      const isActive = button.getAttribute('data-subject') === state.subject;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function filteredTopics() {
    const term = state.search.trim().toLocaleLowerCase('pt-BR');
    return DATA.topics
      .filter((topic) => {
        const levelOk = state.level === 'all' || topic.level === state.level;
        const subjectOk = state.subject === 'all' || topic.subject === state.subject;
        if (!levelOk || !subjectOk) return false;
        if (!term) return true;
        const level = DATA.getLevel(topic.level);
        const subject = DATA.getSubject(topic.subject);
        const haystack = [topic.title, topic.description, level?.name, subject?.name, ...(topic.tags || [])]
          .join(' ')
          .toLocaleLowerCase('pt-BR');
        return haystack.includes(term);
      })
      .sort((a, b) => {
        const levelOrder = DATA.levels.findIndex((level) => level.id === a.level) - DATA.levels.findIndex((level) => level.id === b.level);
        if (levelOrder !== 0) return levelOrder;
        return a.subject === b.subject ? 0 : a.subject === 'portugues' ? -1 : 1;
      });
  }

  function renderTopics() {
    const grid = document.getElementById('topic-grid');
    const empty = document.getElementById('empty-state');
    const title = document.getElementById('results-title');
    const count = document.getElementById('results-count');
    if (!grid) return;

    const topics = filteredTopics();
    const level = state.level === 'all' ? null : DATA.getLevel(state.level);
    const subject = state.subject === 'all' ? null : DATA.getSubject(state.subject);

    title.textContent = level && subject ? `${subject.name} • ${level.name}` : level ? level.name : subject ? subject.name : 'Todos os conteúdos';
    count.textContent = `${topics.length} ${topics.length === 1 ? 'tema encontrado' : 'temas encontrados'}`;

    if (!topics.length) {
      grid.innerHTML = '';
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    grid.innerHTML = topics
      .map((topic) => {
        const topicLevel = DATA.getLevel(topic.level);
        const topicSubject = DATA.getSubject(topic.subject);
        const completed = App.isCompleted(topic.id);
        const isMath = topic.subject === 'matematica';
        return `
          <article class="topic-card ${isMath ? 'topic-card--math' : ''}">
            <div class="topic-card__top">
              <span class="topic-card__icon">${App.icon(isMath ? 'calculator' : 'book-open')}</span>
              <span class="badge ${isMath ? 'badge--yellow' : ''}">${App.escapeHTML(topicLevel?.short || '')}</span>
            </div>
            <h3>${App.escapeHTML(topic.title)}</h3>
            <p>${App.escapeHTML(topic.description)}</p>
            <div class="topic-card__meta">
              <span>${App.icon('clock')} ${topic.duration} min</span>
              <span>${App.icon('list-checks')} ${topic.questions.length} exercícios</span>
            </div>
            <div class="topic-card__footer">
              <a class="text-link" href="aula.html?topico=${encodeURIComponent(topic.id)}">
                Estudar tema ${App.icon('arrow-right')}
              </a>
              ${
                completed
                  ? `<span class="topic-progress">${App.icon('check-circle')} Concluído</span>`
                  : `<span class="badge badge--gray">${App.escapeHTML(topicSubject?.name || '')}</span>`
              }
            </div>
          </article>`;
      })
      .join('');
  }

  function bindEvents() {
    document.getElementById('level-pills')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-level]');
      if (!button) return;
      state.level = button.getAttribute('data-level');
      renderLevelPills();
      renderTopics();
      updateUrl();
    });

    document.getElementById('subject-tabs')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-subject]');
      if (!button) return;
      state.subject = button.getAttribute('data-subject');
      updateSubjectTabs();
      renderTopics();
      updateUrl();
    });

    document.getElementById('topic-search')?.addEventListener('input', (event) => {
      state.search = event.target.value;
      renderTopics();
    });

    document.getElementById('reset-filters')?.addEventListener('click', () => {
      state.level = 'all';
      state.subject = 'all';
      state.search = '';
      const search = document.getElementById('topic-search');
      if (search) search.value = '';
      renderLevelPills();
      updateSubjectTabs();
      renderTopics();
      updateUrl();
    });
  }

  App.ready.then(() => {
    setupFromUrl();
    renderLevelPills();
    updateSubjectTabs();
    bindEvents();
    renderTopics();

    document.querySelectorAll('[data-total-topics]').forEach((node) => {
      node.textContent = DATA.topics.length;
    });
    document.querySelectorAll('[data-total-questions]').forEach((node) => {
      node.textContent = DATA.topics.reduce((total, topic) => total + topic.questions.length, 0);
    });
    App.hydrateIcons();
  });
})();
