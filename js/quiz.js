/* Praticar: configuração do treino, quiz, correção imediata e resultado. */
(function () {
  'use strict';

  const DATA = window.BLABLA_DATA;
  const PREFS_KEY = 'blablablaabel:preferencias:v1';
  const LETTERS = ['A', 'B', 'C', 'D'];

  const setup = {
    level: 'fundamental-2',
    subject: 'portugues',
    topicId: 'all',
    count: 5
  };

  const quiz = {
    questions: [],
    index: 0,
    correct: 0,
    answers: [],
    answered: false,
    selected: null
  };

  function safePrefs() {
    try {
      return JSON.parse(window.localStorage.getItem(PREFS_KEY) || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  function savePrefs() {
    try {
      window.localStorage.setItem(
        PREFS_KEY,
        JSON.stringify({
          level: setup.level,
          subject: setup.subject,
          count: setup.count
        })
      );
    } catch (error) {
      /* O modo visitante continua funcionando mesmo sem localStorage. */
    }
  }

  function initState() {
    const prefs = safePrefs();
    const levelParam = App.getParam('nivel');
    const subjectParam = App.getParam('materia');
    const topicParam = App.getParam('topico');
    const countParam = Number(App.getParam('qtd'));

    const topic = topicParam ? DATA.getTopic(topicParam) : null;
    if (topic) {
      setup.level = topic.level;
      setup.subject = topic.subject;
      setup.topicId = topic.id;
    } else {
      setup.level = DATA.getLevel(levelParam) ? levelParam : DATA.getLevel(prefs.level) ? prefs.level : 'fundamental-2';
      setup.subject = DATA.getSubject(subjectParam) ? subjectParam : DATA.getSubject(prefs.subject) ? prefs.subject : 'portugues';
      setup.topicId = 'all';
    }

    setup.count = [3, 5, 8].includes(countParam) ? countParam : Number(prefs.count) || 5;
  }

  function questionPool() {
    return DATA.questionsBy(setup.level, setup.subject, setup.topicId === 'all' ? null : setup.topicId);
  }

  function actualCount() {
    return Math.min(setup.count, questionPool().length);
  }

  function renderLevelOptions() {
    const container = document.getElementById('level-options');
    if (!container) return;
    container.innerHTML = DATA.levels
      .map(
        (level) => `
          <button class="option-card ${setup.level === level.id ? 'is-active' : ''}" type="button"
            data-setup-level="${level.id}" aria-pressed="${setup.level === level.id}">
            ${App.icon(level.icon)}
            <span>${App.escapeHTML(level.short)}</span>
          </button>`
      )
      .join('');
  }

  function renderSubjectOptions() {
    const container = document.getElementById('subject-options');
    if (!container) return;
    container.innerHTML = DATA.subjects
      .map(
        (subject) => `
          <button class="subject-choice ${subject.tone === 'yellow' ? 'subject-choice--yellow' : ''} ${setup.subject === subject.id ? 'is-active' : ''}"
            type="button" data-setup-subject="${subject.id}" aria-pressed="${setup.subject === subject.id}">
            <span class="subject-choice__icon">${App.icon(subject.icon)}</span>
            <span>
              <strong>${App.escapeHTML(subject.name)}</strong>
              <span>${App.escapeHTML(subject.description)}</span>
            </span>
          </button>`
      )
      .join('');
  }

  function renderQuantityOptions() {
    const container = document.getElementById('quantity-options');
    if (!container) return;
    const options = [...new Set([3, 5, 8, setup.count])].sort((a, b) => a - b);
    container.innerHTML = options
      .map(
        (value) => `
          <button class="quantity-option ${setup.count === value ? 'is-active' : ''}" type="button"
            data-quantity="${value}" aria-pressed="${setup.count === value}">${value} questões</button>`
      )
      .join('');
  }

  function populateTopics() {
    const select = document.getElementById('topic-select');
    if (!select) return;
    const topics = DATA.topicsBy(setup.level, setup.subject);
    if (!topics.some((topic) => topic.id === setup.topicId)) setup.topicId = 'all';
    const allCount = topics.reduce((total, topic) => total + topic.questions.length, 0);
    select.innerHTML = `
      <option value="all">Todos os temas (${allCount} questões)</option>
      ${topics
        .map(
          (topic) =>
            `<option value="${topic.id}">${App.escapeHTML(topic.title)} (${topic.questions.length})</option>`
        )
        .join('')}`;
    select.value = setup.topicId;
  }

  function updateSummary() {
    const level = DATA.getLevel(setup.level);
    const subject = DATA.getSubject(setup.subject);
    const topic = setup.topicId === 'all' ? null : DATA.getTopic(setup.topicId);
    const pool = questionPool();
    const count = actualCount();

    const title = document.getElementById('summary-title');
    const description = document.getElementById('summary-description');
    const summaryLevel = document.getElementById('summary-level');
    const summarySubject = document.getElementById('summary-subject');
    const summaryTopic = document.getElementById('summary-topic');
    const summaryCount = document.getElementById('summary-count');
    const hint = document.getElementById('setup-hint');

    if (title) title.textContent = `${level.name} • ${subject.name}`;
    if (description) {
      description.textContent = topic
        ? `Treino focado em ${topic.title.toLowerCase()}.`
        : 'Questões variadas para testar o que você já sabe.';
    }
    if (summaryLevel) summaryLevel.textContent = level.name;
    if (summarySubject) summarySubject.textContent = subject.name;
    if (summaryTopic) summaryTopic.textContent = topic ? topic.title : 'Todos os temas';
    if (summaryCount) summaryCount.textContent = `${count} de ${pool.length} disponíveis`;
    if (hint) {
      hint.textContent =
        count < setup.count
          ? `Este tema tem ${count} questões disponíveis.`
          : 'Você pode refazer o treino quando quiser.';
    }
  }

  function syncUrl() {
    const params = new URLSearchParams();
    params.set('nivel', setup.level);
    params.set('materia', setup.subject);
    if (setup.topicId !== 'all') params.set('topico', setup.topicId);
    params.set('qtd', String(setup.count));
    window.history.replaceState({}, '', `praticar.html?${params.toString()}`);
  }

  function refreshSetup() {
    renderLevelOptions();
    renderSubjectOptions();
    renderQuantityOptions();
    populateTopics();
    updateSummary();
    savePrefs();
    App.hydrateIcons();
    syncUrl();
  }

  function prepareQuestion(question) {
    const indexed = question.alternatives.map((text, index) => ({
      text,
      isCorrect: index === question.answer
    }));
    const shuffled = App.shuffle(indexed);
    return {
      prompt: question.prompt,
      alternatives: shuffled.map((item) => item.text),
      answer: shuffled.findIndex((item) => item.isCorrect),
      explanation: question.explanation,
      topicId: question.topicId,
      topicTitle: question.topicTitle
    };
  }

  function showView(view) {
    const setupView = document.getElementById('setup-view');
    const quizView = document.getElementById('quiz-view');
    const resultView = document.getElementById('result-view');
    const hero = document.getElementById('practice-hero');
    if (!setupView || !quizView || !resultView) return;
    setupView.hidden = view !== 'setup';
    quizView.hidden = view !== 'quiz';
    resultView.hidden = view !== 'result';
    if (hero) hero.hidden = view !== 'setup';
    if (view !== 'setup') window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function startQuiz() {
    const pool = questionPool();
    if (!pool.length) {
      App.toast('Não encontramos questões para essa combinação. Tente outro tema.', 'error');
      return;
    }

    const questions = App.shuffle(pool)
      .slice(0, setup.count)
      .map(prepareQuestion);

    quiz.questions = questions;
    quiz.index = 0;
    quiz.correct = 0;
    quiz.answers = [];
    quiz.answered = false;
    quiz.selected = null;

    savePrefs();
    syncUrl();
    document.title = 'Treino em andamento — BlablablaAbel';
    showView('quiz');
    renderQuestion();
  }

  function renderQuestion() {
    const question = quiz.questions[quiz.index];
    if (!question) return finishQuiz();

    const level = DATA.getLevel(setup.level);
    const subject = DATA.getSubject(setup.subject);
    const questionEl = document.getElementById('quiz-question');
    const answersEl = document.getElementById('quiz-answers');
    const feedbackEl = document.getElementById('quiz-feedback');
    const tag = document.getElementById('quiz-topic-tag');
    const meta = document.getElementById('quiz-meta');
    const nextButton = document.getElementById('quiz-next');
    const score = document.getElementById('quiz-score');

    quiz.answered = false;
    quiz.selected = null;

    if (tag) tag.innerHTML = `${App.icon('list-checks')} ${App.escapeHTML(question.topicTitle)}`;
    if (meta) {
      meta.innerHTML = `
        <span class="badge ${setup.subject === 'matematica' ? 'badge--yellow' : ''}">${App.escapeHTML(subject.name)}</span>
        <span class="badge badge--gray">${App.escapeHTML(level.short)}</span>`;
    }
    if (questionEl) {
      questionEl.textContent = question.prompt;
      questionEl.setAttribute('tabindex', '-1');
    }
    if (feedbackEl) feedbackEl.innerHTML = '';
    if (nextButton) {
      nextButton.hidden = true;
      nextButton.innerHTML =
        quiz.index === quiz.questions.length - 1
          ? 'Ver resultado <span data-icon="check-circle"></span>'
          : 'Próxima questão <span data-icon="arrow-right"></span>';
    }
    if (score) {
      score.innerHTML = `${App.icon('target')} <span>${quiz.correct} ${quiz.correct === 1 ? 'acerto' : 'acertos'} até agora</span>`;
    }

    if (answersEl) {
      answersEl.innerHTML = question.alternatives
        .map(
          (alternative, index) => `
            <button class="answer" type="button" data-answer-index="${index}">
              <span class="answer__letter">${LETTERS[index] || index + 1}</span>
              <span class="answer__text">${App.escapeHTML(alternative)}</span>
              <span class="answer__status"></span>
            </button>`
        )
        .join('');
    }

    updateProgress(quiz.index);
    App.hydrateIcons();
    window.setTimeout(() => questionEl?.focus({ preventScroll: true }), 60);
  }

  function updateProgress(answeredCount) {
    const label = document.getElementById('quiz-progress-label');
    const percent = document.getElementById('quiz-progress-percent');
    const bar = document.getElementById('quiz-progress-bar');
    const fill = document.getElementById('quiz-progress-fill');
    const value = quiz.questions.length ? Math.round((answeredCount / quiz.questions.length) * 100) : 0;
    if (label) label.textContent = `Questão ${Math.min(quiz.index + 1, quiz.questions.length)} de ${quiz.questions.length}`;
    if (percent) percent.textContent = `${value}%`;
    if (bar) bar.setAttribute('aria-valuenow', String(value));
    if (fill) fill.style.width = `${value}%`;
  }

  function selectAnswer(index) {
    if (quiz.answered) return;
    const question = quiz.questions[quiz.index];
    if (!question) return;
    const selected = Number(index);
    if (selected < 0 || selected >= question.alternatives.length) return;

    quiz.answered = true;
    quiz.selected = selected;
    const isCorrect = selected === question.answer;
    if (isCorrect) quiz.correct += 1;

    quiz.answers.push({
      question,
      selected,
      isCorrect
    });

    const buttons = document.querySelectorAll('#quiz-answers .answer');
    buttons.forEach((button, buttonIndex) => {
      button.disabled = true;
      if (buttonIndex === question.answer) {
        button.classList.add('is-correct');
        const status = button.querySelector('.answer__status');
        if (status) status.innerHTML = App.icon('check-circle');
      } else if (buttonIndex === selected) {
        button.classList.add('is-wrong');
        const status = button.querySelector('.answer__status');
        if (status) status.innerHTML = App.icon('x-circle');
      } else {
        button.classList.add('is-dimmed');
      }
    });

    const feedback = document.getElementById('quiz-feedback');
    if (feedback) {
      feedback.innerHTML = `
        <div class="feedback ${isCorrect ? 'feedback--correct' : 'feedback--wrong'}">
          <span class="feedback__icon">${App.icon(isCorrect ? 'check-circle' : 'x-circle')}</span>
          <div>
            <strong>${isCorrect ? 'Muito bem! Resposta correta.' : 'Quase! Veja a explicação.'}</strong>
            <p>${App.escapeHTML(question.explanation)}</p>
          </div>
        </div>`;
    }

    const nextButton = document.getElementById('quiz-next');
    if (nextButton) nextButton.hidden = false;
    const score = document.getElementById('quiz-score');
    if (score) {
      score.innerHTML = `${App.icon('target')} <span>${quiz.correct} ${quiz.correct === 1 ? 'acerto' : 'acertos'} até agora</span>`;
    }
    updateProgress(quiz.answers.length);
  }

  function nextQuestion() {
    if (!quiz.answered) return;
    if (quiz.index >= quiz.questions.length - 1) {
      finishQuiz();
      return;
    }
    quiz.index += 1;
    renderQuestion();
  }

  function resultMessage(percentage) {
    if (percentage === 100) {
      return {
        icon: 'trophy',
        title: 'Gabaritou!',
        text: 'Mandou muito bem. Que tal aumentar o desafio no próximo treino?'
      };
    }
    if (percentage >= 80) {
      return {
        icon: 'badge-check',
        title: 'Muito bom!',
        text: 'Você domina a maior parte do conteúdo. Revise os detalhes e siga em frente.'
      };
    }
    if (percentage >= 60) {
      return {
        icon: 'target',
        title: 'Bom caminho!',
        text: 'Você já entende bastante. Confira as explicações do que errou e tente novamente.'
      };
    }
    if (percentage >= 40) {
      return {
        icon: 'brain',
        title: 'Continue praticando',
        text: 'Cada tentativa ajuda a fixar. Releia o tema com calma e faça outro treino.'
      };
    }
    return {
      icon: 'lightbulb',
      title: 'Vamos revisar juntos',
      text: 'Sem problema: volte à aula, releia os exemplos e tente de novo. A prática traz confiança.'
    };
  }

  function finishQuiz() {
    const total = quiz.questions.length;
    const percentage = total ? Math.round((quiz.correct / total) * 100) : 0;
    const message = resultMessage(percentage);
    const level = DATA.getLevel(setup.level);
    const subject = DATA.getSubject(setup.subject);
    const topic = setup.topicId === 'all' ? null : DATA.getTopic(setup.topicId);

    App.recordAttempt({
      level: setup.level,
      subject: setup.subject,
      topicId: topic ? topic.id : '',
      topicTitle: topic ? topic.title : 'Treino livre',
      correct: quiz.correct,
      total
    });

    const review = quiz.answers
      .map((item, index) => {
        const correctText = item.question.alternatives[item.question.answer];
        const selectedText = item.question.alternatives[item.selected];
        return `
          <details class="review-item">
            <summary>
              <span class="review-status ${item.isCorrect ? 'review-status--correct' : 'review-status--wrong'}">
                ${App.icon(item.isCorrect ? 'check' : 'x')}
              </span>
              <strong>${index + 1}. ${App.escapeHTML(item.question.prompt)}</strong>
              ${App.icon('chevron-down')}
            </summary>
            <div class="review-body">
              <p><strong>Sua resposta:</strong> ${App.escapeHTML(selectedText)}</p>
              <p class="review-answer"><strong>Resposta correta:</strong> ${App.escapeHTML(correctText)}</p>
              <p class="review-explain">${App.escapeHTML(item.question.explanation)}</p>
            </div>
          </details>`;
      })
      .join('');

    const result = document.getElementById('result-view');
    if (!result) return;

    result.innerHTML = `
      <div class="result-card">
        <div class="result-hero">
          <span class="result-emoji">${App.icon(message.icon)}</span>
          <h1>${message.title}</h1>
          <p>${message.text}</p>
          <div class="result-score-row">
            <div class="result-ring" style="--score: ${percentage}" role="img" aria-label="${percentage}% de acertos">
              <span class="result-ring__value">${percentage}%</span>
            </div>
            <div class="result-stats">
              <div class="result-stat"><strong>${quiz.correct}</strong><span>acertos</span></div>
              <div class="result-stat"><strong>${total - quiz.correct}</strong><span>erros</span></div>
              <div class="result-stat"><strong>${total}</strong><span>questões</span></div>
            </div>
          </div>
          <div class="result-actions">
            <button class="btn btn--yellow" type="button" data-result-action="retry">
              <span data-icon="rotate"></span> Refazer este treino
            </button>
            <button class="btn btn--white" type="button" data-result-action="setup">Mudar treino</button>
            ${
              topic
                ? `<a class="btn btn--white" href="${App.lessonUrl(topic.id)}">Revisar aula</a>`
                : ''
            }
          </div>
        </div>
        <div class="result-review">
          <h2>Veja suas respostas</h2>
          <p>Confira a correção de cada questão e a explicação.${topic ? ` Tema: ${App.escapeHTML(topic.title)}.` : ''}</p>
          <div class="review-list">${review}</div>
          <div class="result-actions" style="justify-content: flex-start; margin-top: 20px;">
            <a class="text-link" href="desempenho.html">${App.icon('chart')} Ver meu desempenho</a>
            <span class="badge badge--gray">${App.escapeHTML(level.name)} • ${App.escapeHTML(subject.name)}</span>
          </div>
        </div>
      </div>`;

    showView('result');
    document.title = `Resultado ${percentage}% — BlablablaAbel`;
    App.hydrateIcons();
    App.toast('Resultado salvo no seu progresso.', 'success');
  }

  function quitQuiz() {
    const inProgress = quiz.answers.length > 0 && quiz.answers.length < quiz.questions.length;
    if (inProgress && !window.confirm('Sair deste treino? O resultado não será salvo.')) return;
    showSetup();
    App.toast('Treino encerrado. Você pode começar outro quando quiser.', 'info');
  }

  function showSetup() {
    quiz.questions = [];
    quiz.index = 0;
    quiz.correct = 0;
    quiz.answers = [];
    quiz.answered = false;
    document.title = 'Praticar — BlablablaAbel';
    refreshSetup();
    showView('setup');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function bindSetup() {
    document.getElementById('setup-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      startQuiz();
    });

    document.querySelectorAll('[data-start-quiz]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        startQuiz();
      });
    });

    document.getElementById('level-options')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-setup-level]');
      if (!button) return;
      setup.level = button.getAttribute('data-setup-level');
      refreshSetup();
    });

    document.getElementById('subject-options')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-setup-subject]');
      if (!button) return;
      setup.subject = button.getAttribute('data-setup-subject');
      refreshSetup();
    });

    document.getElementById('quantity-options')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-quantity]');
      if (!button) return;
      setup.count = Number(button.getAttribute('data-quantity'));
      refreshSetup();
    });

    document.getElementById('topic-select')?.addEventListener('change', (event) => {
      setup.topicId = event.target.value;
      updateSummary();
      savePrefs();
      syncUrl();
    });
  }

  function bindQuiz() {
    document.getElementById('quiz-answers')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-answer-index]');
      if (!button) return;
      selectAnswer(button.getAttribute('data-answer-index'));
    });

    document.getElementById('quiz-next')?.addEventListener('click', nextQuestion);
    document.getElementById('quit-quiz')?.addEventListener('click', quitQuiz);

    document.addEventListener('keydown', (event) => {
      const quizView = document.getElementById('quiz-view');
      if (!quizView || quizView.hidden) return;
      if (event.target.matches('input, textarea, select')) return;
      const number = Number(event.key);
      if (number >= 1 && number <= 4) {
        event.preventDefault();
        selectAnswer(number - 1);
      }
    });

    document.getElementById('result-view')?.addEventListener('click', (event) => {
      const action = event.target.closest('[data-result-action]');
      if (!action) return;
      if (action.getAttribute('data-result-action') === 'retry') {
        startQuiz();
      } else {
        showSetup();
      }
    });
  }

  App.ready.then(() => {
    initState();
    refreshSetup();
    bindSetup();
    bindQuiz();

    if (App.getParam('auto') === '1' && setup.topicId !== 'all') {
      startQuiz();
    } else {
      showView('setup');
    }
  });
})();
