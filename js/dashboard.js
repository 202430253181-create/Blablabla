/* Desempenho: estatísticas locais, sincronização Supabase, sequência, histórico e ranking. */
(function () {
  'use strict';

  const DATA = window.BLABLA_DATA;
  let loadToken = 0;
  let scheduled = null;

  function startOfWeek() {
    const now = new Date();
    const day = (now.getDay() + 6) % 7;
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    monday.setDate(monday.getDate() - day);
    return monday;
  }

  function activitySet(attempts, completed) {
    const days = new Set(App.readStore().activity || []);
    attempts.forEach((attempt) => {
      const date = new Date(attempt.createdAt);
      if (!Number.isNaN(date.getTime())) days.add(App.dateKey(date));
    });
    completed.forEach((item) => {
      const date = new Date(item.completedAt);
      if (!Number.isNaN(date.getTime())) days.add(App.dateKey(date));
    });
    return days;
  }

  function renderGreeting(user) {
    const greeting = document.getElementById('dashboard-greeting');
    const subtitle = document.getElementById('dashboard-subtitle');
    if (user) {
      const name = App.getDisplayName().split(' ')[0];
      if (greeting) greeting.textContent = `Olá, ${name}!`;
      if (subtitle) subtitle.textContent = 'Este é o seu progresso. Continue de onde parou e mantenha o ritmo.';
    } else {
      if (greeting) greeting.textContent = 'Seu progresso';
      if (subtitle) subtitle.textContent = 'Veja o que você já conquistou e qual é o próximo passo.';
    }
  }

  function renderGuestBanner(user) {
    const container = document.getElementById('guest-banner');
    if (!container) return;
    if (user) {
      container.innerHTML = '';
      return;
    }
    const configured = App.configured;
    container.innerHTML = `
      <div class="guest-banner">
        <div class="guest-banner__text">
          <span class="guest-banner__icon">${App.icon('user')}</span>
          <div>
            <strong>Você está estudando como visitante</strong>
            <p>${
              configured
                ? 'Seu progresso fica salvo neste dispositivo. Crie uma conta para sincronizar e participar do ranking.'
                : 'Seu progresso fica salvo neste dispositivo. Crie uma conta para levar seus dados para outros aparelhos.'
            }</p>
          </div>
        </div>
        <a class="btn btn--sm" href="entrar.html?next=desempenho.html">${App.icon('arrow-right')} Ativar minha conta</a>
      </div>`;
  }

  function renderStatistics(stats, completed, attempts, days) {
    const questions = document.getElementById('stat-questions');
    const accuracy = document.getElementById('stat-accuracy');
    const accuracyHint = document.getElementById('stat-accuracy-hint');
    const topics = document.getElementById('stat-topics');
    const attemptsEl = document.getElementById('stat-attempts');
    const donut = document.getElementById('accuracy-donut');
    const donutValue = document.getElementById('accuracy-value');
    const caption = document.getElementById('accuracy-caption');
    const ptAccuracy = document.getElementById('pt-accuracy');
    const matAccuracy = document.getElementById('mat-accuracy');
    const ptFill = document.getElementById('pt-fill');
    const matFill = document.getElementById('mat-fill');

    if (questions) questions.textContent = App.formatNumber(stats.total);
    if (accuracy) accuracy.textContent = App.formatPercent(stats.accuracy);
    if (accuracyHint) accuracyHint.textContent = stats.total ? `em ${stats.total} respostas` : 'comece com um treino';
    if (topics) topics.textContent = App.formatNumber(completed.length);
    if (attemptsEl) attemptsEl.textContent = App.formatNumber(attempts.length);

    if (donut) {
      donut.style.setProperty('--value', Math.round(stats.accuracy));
      donut.setAttribute('aria-label', `Aproveitamento de ${Math.round(stats.accuracy)}%`);
    }
    if (donutValue) donutValue.textContent = App.formatPercent(stats.accuracy);
    if (caption) {
      caption.textContent = stats.total
        ? `Baseado em ${stats.total} ${stats.total === 1 ? 'resposta' : 'respostas'}.`
        : 'Ainda não há questões suficientes para calcular.';
    }

    const pt = stats.bySubject.portugues;
    const mat = stats.bySubject.matematica;
    if (ptAccuracy) ptAccuracy.textContent = pt.total ? App.formatPercent(pt.accuracy) : '—';
    if (matAccuracy) matAccuracy.textContent = mat.total ? App.formatPercent(mat.accuracy) : '—';
    if (ptFill) ptFill.style.width = `${pt.total ? pt.accuracy : 0}%`;
    if (matFill) matFill.style.width = `${mat.total ? mat.accuracy : 0}%`;

    renderStreak(days, attempts);
  }

  function renderStreak(days, attempts) {
    const streak = App.getStreak([...days]);
    const count = document.getElementById('streak-count');
    const label = document.getElementById('streak-label');
    if (count) count.textContent = `${streak} ${streak === 1 ? 'dia' : 'dias'}`;
    if (label) {
      if (streak === 0) label.textContent = 'Comece hoje a construir sua sequência.';
      else if (streak === 1) label.textContent = 'Volte amanhã para manter o ritmo.';
      else label.textContent = 'Você está em uma boa sequência. Continue!';
    }

    const weekContainer = document.getElementById('week-days');
    if (weekContainer) {
      const monday = startOfWeek();
      const labels = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
      const today = App.dateKey();
      weekContainer.innerHTML = labels
        .map((label, index) => {
          const date = new Date(monday);
          date.setDate(monday.getDate() + index);
          const key = App.dateKey(date);
          const isDone = days.has(key);
          const isToday = key === today;
          return `
            <span class="week-day ${isDone ? 'is-done' : ''} ${isToday ? 'is-today' : ''}">
              <span class="week-dot">${isDone ? App.icon('check') : date.getDate()}</span>
              <span>${label}</span>
            </span>`;
        })
        .join('');
    }

    const weekStart = startOfWeek().getTime();
    const weekAttempts = attempts.filter((attempt) => new Date(attempt.createdAt).getTime() >= weekStart);
    const goalText = document.getElementById('weekly-goal-text');
    const goalFill = document.getElementById('weekly-goal-fill');
    const goal = 3;
    const value = Math.min(weekAttempts.length, goal);
    if (goalText) {
      goalText.textContent =
        weekAttempts.length >= goal
          ? `Meta concluída • ${weekAttempts.length} treinos`
          : `${weekAttempts.length} de ${goal} treinos`;
    }
    if (goalFill) goalFill.style.width = `${(value / goal) * 100}%`;
  }

  function renderHistory(attempts) {
    const container = document.getElementById('history-list');
    if (!container) return;
    if (!attempts.length) {
      container.innerHTML = `
        <div class="empty-mini">
          Nenhum treino ainda.<br>
          <a class="text-link" href="praticar.html" style="margin-top: 8px;">${App.icon('play')} Fazer o primeiro treino</a>
        </div>`;
      return;
    }

    container.innerHTML = attempts
      .slice(0, 8)
      .map((attempt) => {
        const percent = attempt.total ? (attempt.correct / attempt.total) * 100 : 0;
        const scoreClass = percent >= 80 ? 'is-high' : percent < 50 ? 'is-low' : '';
        const isMath = attempt.subject === 'matematica';
        const level = DATA.getLevel(attempt.level);
        return `
          <div class="history-item">
            <span class="history-icon ${isMath ? 'history-icon--yellow' : ''}">
              ${App.icon(isMath ? 'calculator' : 'book-open')}
            </span>
            <div class="history-copy">
              <strong>${App.escapeHTML(attempt.topicTitle || 'Treino livre')}</strong>
              <span>${App.formatDate(attempt.createdAt, { day: '2-digit', month: 'short' })} • ${App.escapeHTML(level?.short || 'Treino')} • ${attempt.total} questões</span>
            </div>
            <span class="history-score ${scoreClass}">${attempt.correct}/${attempt.total}</span>
          </div>`;
      })
      .join('');
  }

  function renderCompleted(completed) {
    const container = document.getElementById('completed-list');
    if (!container) return;
    if (!completed.length) {
      container.innerHTML = `
        <div class="empty-mini">
          Nenhum tema concluído ainda.<br>
          <a class="text-link" href="estudar.html" style="margin-top: 8px;">${App.icon('book-open')} Explorar conteúdos</a>
        </div>`;
      return;
    }
    container.innerHTML = completed
      .slice()
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, 8)
      .map((item) => {
        const topic = DATA.getTopic(item.topicId);
        return `<a class="completed-pill" href="${topic ? App.lessonUrl(topic.id) : 'estudar.html'}">
          ${App.icon('check-circle')} ${App.escapeHTML(topic?.title || 'Tema concluído')}
        </a>`;
      })
      .join('');
  }

  function rankingNote(html) {
    const note = document.getElementById('ranking-note');
    if (note) note.innerHTML = html;
  }

  async function loadRanking(token) {
    const container = document.getElementById('ranking-list');
    if (!container) return;
    const { user, db } = App.getState();

    if (!App.configured) {
      container.innerHTML = '';
      rankingNote('<p class="empty-mini">Entre com uma conta para participar do ranking semanal.</p>');
      return;
    }
    if (!user || !db) {
      container.innerHTML = '';
      rankingNote(`
        <p class="empty-mini">Entre na sua conta para ver sua posição no ranking semanal.</p>
        <a class="btn btn--outline btn--sm btn--block" href="entrar.html?next=desempenho.html">Entrar e participar</a>`);
      return;
    }

    container.innerHTML = '<div class="empty-mini">Carregando ranking...</div>';
    rankingNote('');
    try {
      const { data, error } = await db.rpc('ranking_semanal');
      if (error) throw error;
      if (token !== loadToken) return;
      const rows = Array.isArray(data) ? data : [];
      if (!rows.length) {
        container.innerHTML = '';
        rankingNote('<p class="empty-mini">Ainda não há pontos esta semana. Faça um treino para entrar no ranking!</p>');
        return;
      }
      const myName = App.getDisplayName();
      container.innerHTML = rows
        .slice(0, 10)
        .map((row, index) => {
          const isMe = row.nome === myName;
          return `
            <div class="ranking-item ${isMe ? 'is-me' : ''}">
              <span class="ranking-position">${index + 1}</span>
              <span class="ranking-name">${App.escapeHTML(row.nome || 'Estudante')}${isMe ? ' (você)' : ''}</span>
              <span class="ranking-points"><strong>${App.formatNumber(row.pontos)}</strong> pts</span>
            </div>`;
        })
        .join('');
      App.hydrateIcons();
    } catch (error) {
      console.warn('Ranking indisponível.', error);
      if (token !== loadToken) return;
      container.innerHTML = '';
      rankingNote('<p class="empty-mini">O ranking está indisponível agora. Tente novamente mais tarde.</p>');
    }
  }

  function render(snapshot, remoteAvailable) {
    const { user } = App.getState();
    renderGreeting(user);
    renderGuestBanner(user);

    const syncNote = document.getElementById('sync-note');
    if (syncNote) {
      if (user && !remoteAvailable) {
        syncNote.innerHTML = `
          <div class="form-message form-message--info" style="margin-bottom: 18px;">
            ${App.icon('info')}
            <span>Mostrando o progresso salvo neste dispositivo. A sincronização com a nuvem não está disponível no momento.</span>
          </div>`;
      } else {
        syncNote.innerHTML = '';
      }
    }

    const stats = App.getStats(snapshot.attempts);
    const days = activitySet(snapshot.attempts, snapshot.completed);
    renderStatistics(stats, snapshot.completed, snapshot.attempts, days);
    renderHistory(snapshot.attempts);
    renderCompleted(snapshot.completed);
    App.hydrateIcons();
  }

  async function load() {
    const token = ++loadToken;
    const local = App.readStore();
    const { user } = App.getState();
    render({ attempts: local.attempts, completed: local.completed }, true);

    if (!user) {
      loadRanking(token);
      return;
    }

    const remote = await App.fetchRemoteData();
    if (token !== loadToken) return;
    if (remote.available) {
      const attempts = App.mergeAttempts(local.attempts, remote.attempts);
      const completed = App.mergeCompleted(local.completed, remote.completed);
      render({ attempts, completed }, true);
    } else {
      render({ attempts: local.attempts, completed: local.completed }, false);
    }
    loadRanking(token);
  }

  function scheduleLoad() {
    window.clearTimeout(scheduled);
    scheduled = window.setTimeout(load, 40);
  }

  App.ready.then(() => {
    renderGreeting(App.user);
    renderGuestBanner(App.user);
    scheduleLoad();
    App.onAuthChange(scheduleLoad);
  });
})();
