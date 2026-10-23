/* Aula: renderiza teoria, exemplos, dica, navegação e conclusão. */
(function () {
  'use strict';

  const DATA = window.BLABLA_DATA;
  let topic = null;

  function renderBreadcrumb(level, subject) {
    const el = document.getElementById('lesson-breadcrumb');
    if (!el) return;
    el.innerHTML = `
      <a href="index.html">${App.icon('home')} Início</a>
      <span>${App.icon('chevron-right')}</span>
      <a href="estudar.html">Conteúdos</a>
      <span>${App.icon('chevron-right')}</span>
      <a href="estudar.html?nivel=${encodeURIComponent(level.id)}&materia=${encodeURIComponent(subject.id)}">${App.escapeHTML(level.name)} • ${App.escapeHTML(subject.name)}</a>
      <span>${App.icon('chevron-right')}</span>
      <span>${App.escapeHTML(topic.title)}</span>`;
  }

  function renderHeader(level, subject, completed) {
    document.title = `${topic.title} — BlablablaAbel`;
    const title = document.getElementById('lesson-title');
    const description = document.getElementById('lesson-description');
    const meta = document.getElementById('lesson-meta');
    const info = document.getElementById('lesson-info');
    if (title) title.textContent = topic.title;
    if (description) description.textContent = topic.description;
    if (meta) {
      meta.innerHTML = `
        <span class="badge ${subject.id === 'matematica' ? 'badge--yellow' : ''}">
          ${App.icon(subject.id === 'matematica' ? 'calculator' : 'book-open')}
          ${App.escapeHTML(subject.name)}
        </span>
        <span class="badge badge--gray">${App.escapeHTML(level.name)} · ${App.escapeHTML(level.range)}</span>
        ${completed ? `<span class="badge badge--green" data-completed-badge>${App.icon('check-circle')} Concluído</span>` : ''}`;
    }
    if (info) {
      info.innerHTML = `
        <span>${App.icon('clock')} ${topic.duration} min de leitura</span>
        <span>${App.icon('list-checks')} ${topic.questions.length} exercícios</span>
        <span>${App.icon('graduation-cap')} ${App.escapeHTML(level.short)}</span>`;
    }
  }

  function renderBody() {
    const body = document.getElementById('lesson-body');
    if (!body) return;
    const theory = topic.theory
      .map(
        (section, index) => `
          <section class="lesson-section">
            <div class="lesson-section__head">
              <span class="lesson-section__number">${String(index + 1).padStart(2, '0')}</span>
              <h2>${App.escapeHTML(section.title)}</h2>
            </div>
            <p>${App.escapeHTML(section.text)}</p>
          </section>`
      )
      .join('');

    const examples = (topic.examples || [])
      .map(
        (example, index) => `
          <div class="example-item">
            <span class="example-item__marker">${index + 1}</span>
            <div>
              <strong>${App.escapeHTML(example.title)}</strong>
              <p>${App.escapeHTML(example.text)}</p>
            </div>
          </div>`
      )
      .join('');

    const exampleBox = examples
      ? `
      <section class="example-box" style="margin-top: 16px;">
        <div class="example-box__label">${App.icon('lightbulb')} Exemplos para entender</div>
        <div class="example-list">${examples}</div>
      </section>`
      : '';

    body.innerHTML = `
      ${theory}
      ${exampleBox}
      <div class="tip-box" style="margin-top: 16px;">
        <span class="tip-box__icon">${App.icon('lightbulb')}</span>
        <div>
          <strong>Dica do Abel</strong>
          <p>${App.escapeHTML(topic.tip)}</p>
        </div>
      </div>`;
  }

  function renderSidebar(level, subject) {
    const practice = document.getElementById('lesson-practice');
    if (practice) {
      practice.href = App.practiceUrl({
        level: topic.level,
        subject: topic.subject,
        topicId: topic.id,
        auto: true,
        count: topic.questions.length
      });
    }
    const sideInfo = document.getElementById('lesson-side-info');
    if (sideInfo) {
      sideInfo.innerHTML = `
        <span>${App.icon('list-checks')} ${topic.questions.length} questões sobre o tema</span>
        <span>${App.icon('zap')} Correção imediata</span>
        <span>${App.icon('chart')} Progresso salvo</span>`;
    }

    const siblings = document.getElementById('lesson-siblings');
    if (siblings) {
      const list = DATA.topicsBy(level.id, subject.id);
      siblings.innerHTML = list
        .map((item) => {
          const isCurrent = item.id === topic.id;
          return `
            <a class="side-topic-link ${isCurrent ? 'is-active' : ''}" href="${isCurrent ? '#' : `aula.html?topico=${encodeURIComponent(item.id)}`}" ${isCurrent ? 'aria-current="page"' : ''}>
              ${App.icon(isCurrent ? 'play' : 'file-text')}
              <span>${App.escapeHTML(item.title)}</span>
            </a>`;
        })
        .join('');
    }
  }

  function renderComplete(completed) {
    const button = document.getElementById('complete-lesson');
    const label = document.getElementById('complete-label');
    const helper = document.getElementById('lesson-progress-text');
    if (!button || !label) return;
    button.classList.toggle('is-complete', completed);
    label.textContent = completed ? 'Tema concluído' : 'Marcar como concluída';
    button.disabled = completed;
    if (helper) {
      helper.textContent = completed
        ? 'Boa! Este tema já faz parte do seu progresso.'
        : 'Marque esta aula como concluída para acompanhar sua evolução.';
    }
  }

  function bindComplete() {
    const button = document.getElementById('complete-lesson');
    if (!button) return;
    button.addEventListener('click', () => {
      const wasCompleted = App.isCompleted(topic.id);
      if (wasCompleted) return;
      App.markTopicComplete(topic.id);
      renderComplete(true);
      const level = DATA.getLevel(topic.level);
      const subject = DATA.getSubject(topic.subject);
      renderHeader(level, subject, true);
      App.hydrateIcons();
      App.toast('Tema concluído! Seu progresso foi atualizado.', 'success');
    });
  }

  function renderNavigation(level, subject) {
    const nav = document.getElementById('lesson-nav');
    if (!nav) return;
    const list = DATA.topicsBy(level.id, subject.id);
    const index = list.findIndex((item) => item.id === topic.id);
    const previous = list[index - 1];
    const next = list[index + 1];
    if (!previous && !next) {
      nav.innerHTML = '';
      return;
    }
    nav.innerHTML = `
      ${
        previous
          ? `<a class="lesson-nav__item" href="aula.html?topico=${encodeURIComponent(previous.id)}">
              <span>${App.icon('arrow-left')} Anterior</span>
              <strong>${App.escapeHTML(previous.title)}</strong>
            </a>`
          : '<span></span>'
      }
      ${
        next
          ? `<a class="lesson-nav__item lesson-nav__item--next" href="aula.html?topico=${encodeURIComponent(next.id)}">
              <span>Próximo ${App.icon('arrow-right')}</span>
              <strong>${App.escapeHTML(next.title)}</strong>
            </a>`
          : ''
      }`;
  }

  App.ready.then(() => {
    const topicId = App.getParam('topico');
    topic = topicId ? DATA.getTopic(topicId) : null;
    if (!topic) {
      window.location.replace('estudar.html');
      return;
    }

    const level = DATA.getLevel(topic.level);
    const subject = DATA.getSubject(topic.subject);
    const completed = App.isCompleted(topic.id);

    renderBreadcrumb(level, subject);
    renderHeader(level, subject, completed);
    renderBody();
    renderSidebar(level, subject);
    renderComplete(completed);
    renderNavigation(level, subject);
    bindComplete();
    App.hydrateIcons();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
})();
