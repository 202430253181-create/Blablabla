/* BlablablaAbel — núcleo compartilhado: navegação, sessão, progresso local,
   integração com Supabase, ícones e feedback visual. */
(function () {
  'use strict';

  const STORAGE_KEY = 'blablablaabel:progresso:v1';
  const CONFIG = window.BLAB_CONFIG || {};
  const DATA = window.BLABLA_DATA || { topics: [], levels: [], subjects: [] };

  const ICONS = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
    'arrow-up-right': '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'book-open': '<path d="M12 6.5A5 5 0 0 0 8 5H3v14h5a5 5 0 0 1 4 1.5V6.5Z"/><path d="M12 6.5A5 5 0 0 1 16 5h5v14h-5a5 5 0 0 0-4 1.5V6.5Z"/>',
    calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>',
    pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    'graduation-cap': '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 10v6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.4 2.4 4.8-5"/>',
    'x-circle': '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    sparkles: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>',
    'lightbulb': '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16v-7"/>',
    flame: '<path d="M12 22c4 0 7-2.9 7-6.5 0-3.2-2-5.7-4.2-7.8-.7-.7-1.8-.1-1.7.9.1 1.1-.3 2-1.1 2.4.3-2.2-.7-4.7-2.6-6.1-.8-.6-1.9 0-1.8 1 .1 2.1-1.6 3.5-2.2 5.3A6.5 6.5 0 0 0 5 15.5C5 19.1 8 22 12 22Z"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="m3 3 18 18"/><path d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3 3.6"/><path d="M6.6 6.6A17.5 17.5 0 0 0 2 12s3.5 6 10 6c1.4 0 2.7-.3 3.8-.7"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 21h16"/>',
    'wifi-off': '<path d="m3 3 18 18"/><path d="M8.5 8.5A11 11 0 0 1 21 9"/><path d="M5 12a12 12 0 0 1 1.5-1.2"/><path d="M8.5 15.5a6.5 6.5 0 0 1 7 0"/><path d="M12 19h.01"/>',
    'list-checks': '<path d="M10 6h11M10 12h11M10 18h11"/><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2"/>',
    play: '<path d="m8 5 11 7-11 7V5Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v4M12 17h.01"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
    medal: '<circle cx="12" cy="8" r="5"/><path d="m8.5 12.5-2 8 5.5-3 5.5 3-2-8"/>',
    brain: '<path d="M9.5 4A3.5 3.5 0 0 0 6 7.5v.3A3.5 3.5 0 0 0 4 14a3.5 3.5 0 0 0 3 5.5A3.5 3.5 0 0 0 12 18V6a2 2 0 0 0-2.5-2Z"/><path d="M14.5 4A3.5 3.5 0 0 1 18 7.5v.3A3.5 3.5 0 0 1 20 14a3.5 3.5 0 0 1-3 5.5A3.5 3.5 0 0 1 12 18V6a2 2 0 0 1 2.5-2Z"/>',
    'badge-check': '<path d="m12 2 2.4 1.8 3 .1.9 2.9 2.3 1.9-1.1 2.8 1.1 2.8-2.3 1.9-.9 2.9-3 .1L12 22l-2.4-1.8-3-.1-.9-2.9-2.3-1.9 1.1-2.8-1.1-2.8 2.3-1.9.9-2.9 3-.1L12 2Z"/><path d="m8.5 12 2.3 2.3 4.7-4.8"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>'
  };

  const state = {
    db: null,
    session: null,
    user: null,
    profile: null,
    configured: false,
    authResolved: false,
    authListeners: [],
    initialized: false
  };

  function icon(name, className) {
    const body = ICONS[name] || ICONS.info;
    return `<svg class="${className || 'icon'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
  }

  function hydrateIcons(scope) {
    (scope || document).querySelectorAll('[data-icon]').forEach((element) => {
      const name = element.getAttribute('data-icon');
      element.innerHTML = icon(name, element.getAttribute('data-icon-class') || 'icon');
    });
  }

  function escapeHTML(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }
    return copy;
  }

  function uuid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getParam(name, fallback = '') {
    return new URLSearchParams(window.location.search).get(name) || fallback;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value || 0);
  }

  function formatPercent(value) {
    return `${Math.round(value || 0)}%`;
  }

  function formatDate(value, options) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', options || { day: '2-digit', month: 'short' }).format(date);
  }

  function dateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function dateFromKey(key) {
    const [year, month, day] = key.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function emptyStore() {
    return { attempts: [], completed: [], activity: [] };
  }

  function readStore() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyStore();
      const parsed = JSON.parse(raw);
      return {
        attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
        completed: Array.isArray(parsed.completed) ? parsed.completed : [],
        activity: Array.isArray(parsed.activity) ? parsed.activity : []
      };
    } catch (error) {
      console.warn('Não foi possível ler o progresso local.', error);
      return emptyStore();
    }
  }

  function writeStore(store) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (error) {
      console.warn('Não foi possível salvar o progresso local.', error);
    }
  }

  function registerActivity(store) {
    const today = dateKey();
    if (!store.activity.includes(today)) {
      store.activity.push(today);
      store.activity = store.activity.slice(-400);
    }
  }

  function getStreak(activity) {
    const days = new Set(activity || readStore().activity);
    if (!days.size) return 0;
    const cursor = new Date();
    if (!days.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    let streak = 0;
    while (days.has(dateKey(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function isCompleted(topicId) {
    return readStore().completed.some((item) => item.topicId === topicId);
  }

  function getCompletedTopics() {
    return readStore().completed;
  }

  function markTopicComplete(topicId) {
    const topic = DATA.getTopic ? DATA.getTopic(topicId) : null;
    if (!topic) return false;
    const store = readStore();
    const exists = store.completed.some((item) => item.topicId === topicId);
    if (!exists) {
      store.completed.push({
        topicId,
        level: topic.level,
        subject: topic.subject,
        completedAt: new Date().toISOString()
      });
      registerActivity(store);
      writeStore(store);
    }
    if (state.db && state.user) {
      state.db
        .from('study_progress')
        .upsert(
          {
            user_id: state.user.id,
            topico_id: topic.id,
            nivel: topic.level,
            materia: topic.subject,
            concluido: true,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id,topico_id' }
        )
        .then(({ error }) => {
          if (error) console.warn('Progresso remoto não sincronizado.', error.message);
        });
    }
    return !exists;
  }

  function recordAttempt(attempt) {
    const topic = attempt.topicId && DATA.getTopic ? DATA.getTopic(attempt.topicId) : null;
    const record = {
      id: uuid(),
      level: attempt.level || topic?.level || '',
      subject: attempt.subject || topic?.subject || '',
      topicId: attempt.topicId || '',
      topicTitle: attempt.topicTitle || topic?.title || 'Treino livre',
      correct: Number(attempt.correct) || 0,
      total: Number(attempt.total) || 0,
      createdAt: new Date().toISOString(),
      remoteId: null
    };
    const store = readStore();
    store.attempts.unshift(record);
    store.attempts = store.attempts.slice(0, 250);
    registerActivity(store);
    writeStore(store);
    persistAttempt(record);
    return record;
  }

  async function persistAttempt(record) {
    if (!state.db || !state.user) return;
    const { data, error } = await state.db
      .from('quiz_attempts')
      .insert({
        user_id: state.user.id,
        nivel: record.level,
        materia: record.subject,
        topico_id: record.topicId || null,
        acertos: record.correct,
        total: record.total,
        created_at: record.createdAt
      })
      .select('id')
      .single();
    if (error) {
      console.warn('Tentativa remota não sincronizada.', error.message);
      return;
    }
    const store = readStore();
    const localRecord = store.attempts.find((item) => item.id === record.id);
    if (localRecord && data?.id) {
      localRecord.remoteId = data.id;
      writeStore(store);
    }
  }

  async function fetchRemoteData() {
    if (!state.db || !state.user) {
      return { available: false, attempts: [], completed: [] };
    }
    try {
      const [attemptResult, progressResult] = await Promise.all([
        state.db
          .from('quiz_attempts')
          .select('id, nivel, materia, topico_id, acertos, total, created_at')
          .order('created_at', { ascending: false })
          .limit(100),
        state.db
          .from('study_progress')
          .select('topico_id, nivel, materia, concluido, updated_at')
          .eq('concluido', true)
      ]);
      if (attemptResult.error) throw attemptResult.error;
      if (progressResult.error) throw progressResult.error;
      return {
        available: true,
        attempts: (attemptResult.data || []).map((item) => ({
          id: `remote-${item.id}`,
          remoteId: item.id,
          level: item.nivel,
          subject: item.materia,
          topicId: item.topico_id || '',
          topicTitle: DATA.getTopic ? DATA.getTopic(item.topico_id)?.title || 'Treino livre' : 'Treino livre',
          correct: item.acertos,
          total: item.total,
          createdAt: item.created_at
        })),
        completed: (progressResult.data || []).map((item) => ({
          topicId: item.topico_id,
          level: item.nivel,
          subject: item.materia,
          completedAt: item.updated_at
        }))
      };
    } catch (error) {
      console.warn('Não foi possível carregar os dados remotos.', error);
      return { available: false, attempts: [], completed: [] };
    }
  }

  function mergeAttempts(localAttempts, remoteAttempts) {
    const remoteIds = new Set(remoteAttempts.map((item) => String(item.remoteId)));
    const pendingLocal = localAttempts.filter((item) => !item.remoteId || !remoteIds.has(String(item.remoteId)));
    return [...remoteAttempts, ...pendingLocal].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  function mergeCompleted(localCompleted, remoteCompleted) {
    const seen = new Set();
    return [...localCompleted, ...remoteCompleted].filter((item) => {
      if (!item.topicId || seen.has(item.topicId)) return false;
      seen.add(item.topicId);
      return true;
    });
  }

  function getStats(attempts) {
    const list = attempts || readStore().attempts;
    const totals = list.reduce(
      (acc, attempt) => {
        const correct = Number(attempt.correct) || 0;
        const total = Number(attempt.total) || 0;
        acc.correct += correct;
        acc.total += total;
        if (attempt.subject === 'portugues' || attempt.subject === 'matematica') {
          acc.bySubject[attempt.subject].correct += correct;
          acc.bySubject[attempt.subject].total += total;
          acc.bySubject[attempt.subject].attempts += 1;
        }
        return acc;
      },
      {
        correct: 0,
        total: 0,
        attempts: list.length,
        bySubject: {
          portugues: { correct: 0, total: 0, attempts: 0 },
          matematica: { correct: 0, total: 0, attempts: 0 }
        }
      }
    );
    totals.accuracy = totals.total ? (totals.correct / totals.total) * 100 : 0;
    Object.values(totals.bySubject).forEach((subject) => {
      subject.accuracy = subject.total ? (subject.correct / subject.total) * 100 : 0;
    });
    return totals;
  }

  function practiceUrl(options) {
    const params = new URLSearchParams();
    if (options?.level) params.set('nivel', options.level);
    if (options?.subject) params.set('materia', options.subject);
    if (options?.topicId) params.set('topico', options.topicId);
    if (options?.auto) params.set('auto', '1');
    if (options?.count) params.set('qtd', options.count);
    return `praticar.html${params.toString() ? `?${params.toString()}` : ''}`;
  }

  function lessonUrl(topicId) {
    return `aula.html?topico=${encodeURIComponent(topicId)}`;
  }

  function toast(message, type = 'info', duration = 3800) {
    let region = document.getElementById('toast-region');
    if (!region) {
      region = document.createElement('div');
      region.id = 'toast-region';
      region.className = 'toast-region';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      document.body.appendChild(region);
    }
    const element = document.createElement('div');
    const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info';
    element.className = `toast toast--${type}`;
    element.innerHTML = `${icon(iconName, 'toast__icon')}<span>${escapeHTML(message)}</span>`;
    region.appendChild(element);
    window.setTimeout(() => {
      element.classList.add('is-leaving');
      window.setTimeout(() => element.remove(), 240);
    }, duration);
  }

  function getDisplayName() {
    if (state.profile?.nome) return state.profile.nome;
    if (state.user?.user_metadata?.nome) return state.user.user_metadata.nome;
    if (state.user?.email) return state.user.email.split('@')[0];
    return 'Estudante';
  }

  function getInitials(name) {
    return String(name || 'E')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  async function loadProfile() {
    if (!state.db || !state.user) {
      state.profile = null;
      return null;
    }
    const { data, error } = await state.db
      .from('profiles')
      .select('id, nome, nivel, created_at')
      .eq('id', state.user.id)
      .maybeSingle();
    if (error) {
      console.warn('Perfil remoto indisponível.', error.message);
      state.profile = null;
      return null;
    }
    state.profile = data || null;
    return state.profile;
  }

  function renderAccount() {
    const areas = document.querySelectorAll('[data-auth-area]');
    if (!areas.length) return;
    const name = getDisplayName();
    const email = state.user?.email || '';
    areas.forEach((area) => {
      if (state.user) {
        area.innerHTML = `
          <div class="account-menu">
            <button class="account-chip" type="button" data-account-toggle aria-expanded="false" aria-controls="account-panel">
              <span class="account-avatar" aria-hidden="true">${escapeHTML(getInitials(name))}</span>
              <span class="account-chip__text"><span>Olá, ${escapeHTML(name.split(' ')[0])}</span><strong>Minha conta</strong></span>
              ${icon('chevron-down', 'account-chip__chevron')}
            </button>
            <div class="account-panel" id="account-panel" hidden>
              <div class="account-panel__head">
                <span class="account-avatar account-avatar--lg" aria-hidden="true">${escapeHTML(getInitials(name))}</span>
                <div>
                  <strong>${escapeHTML(name)}</strong>
                  <span>${escapeHTML(email)}</span>
                </div>
              </div>
              <a class="account-panel__link" href="desempenho.html">${icon('chart')}<span>Meu desempenho</span></a>
              <a class="account-panel__link" href="estudar.html">${icon('book-open')}<span>Explorar conteúdos</span></a>
              <button class="account-panel__link account-panel__link--danger" type="button" data-action="logout">${icon('log-out')}<span>Sair da conta</span></button>
            </div>
          </div>`;
      } else {
        area.innerHTML = `
          <a class="btn btn--ghost btn--sm account-login" href="entrar.html">
            ${icon('user')}<span>Entrar</span>
          </a>`;
      }
    });
  }

  function notifyAuth() {
    const detail = {
      user: state.user,
      profile: state.profile,
      session: state.session,
      configured: state.configured
    };
    state.authListeners.forEach((callback) => {
      try {
        callback(detail);
      } catch (error) {
        console.error(error);
      }
    });
    window.dispatchEvent(new CustomEvent('app:auth', { detail }));
  }

  function onAuthChange(callback) {
    state.authListeners.push(callback);
    if (state.authResolved) {
      window.queueMicrotask(() =>
        callback({
          user: state.user,
          profile: state.profile,
          session: state.session,
          configured: state.configured
        })
      );
    }
    return () => {
      state.authListeners = state.authListeners.filter((listener) => listener !== callback);
    };
  }

  async function signOut() {
    if (state.db) {
      const { error } = await state.db.auth.signOut();
      if (error) {
        toast('Não foi possível sair agora. Tente novamente.', 'error');
        return false;
      }
    }
    state.user = null;
    state.session = null;
    state.profile = null;
    renderAccount();
    notifyAuth();
    toast('Você saiu da conta.', 'success');
    return true;
  }

  function setupAccountEvents() {
    document.addEventListener('click', (event) => {
      const toggle = event.target.closest('[data-account-toggle]');
      if (toggle) {
        const menu = toggle.closest('.account-menu');
        const panel = menu?.querySelector('.account-panel');
        if (!menu || !panel) return;
        const isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        panel.hidden = !isOpen;
        return;
      }

      if (!event.target.closest('.account-menu')) {
        document.querySelectorAll('.account-menu.is-open').forEach((menu) => {
          menu.classList.remove('is-open');
          menu.querySelector('[data-account-toggle]')?.setAttribute('aria-expanded', 'false');
          const panel = menu.querySelector('.account-panel');
          if (panel) panel.hidden = true;
        });
      }

      const logout = event.target.closest('[data-action="logout"]');
      if (logout) {
        event.preventDefault();
        logout.disabled = true;
        signOut().finally(() => {
          logout.disabled = false;
        });
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('.account-menu.is-open').forEach((menu) => {
        menu.classList.remove('is-open');
        menu.querySelector('[data-account-toggle]')?.setAttribute('aria-expanded', 'false');
        const panel = menu.querySelector('.account-panel');
        if (panel) panel.hidden = true;
      });
      closeMobileNav();
    });
  }

  function initMobileNav() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const header = document.querySelector('.site-header');
    if (!toggle || !header) return;
    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('is-nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-open', isOpen);
    });
    header.querySelectorAll('.main-nav a').forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  function closeMobileNav() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('[data-menu-toggle]');
    if (!header) return;
    header.classList.remove('is-nav-open');
    document.body.classList.remove('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function setActiveNav() {
    const page = document.body.dataset.page || '';
    const map = {
      home: 'inicio',
      study: 'conteudos',
      lesson: 'conteudos',
      practice: 'praticar',
      dashboard: 'progresso',
      auth: 'entrar'
    };
    const active = map[page] || '';
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const isActive = link.getAttribute('data-nav') === active;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  async function initAuth() {
    state.configured = Boolean(
      CONFIG.supabaseUrl &&
        CONFIG.supabaseAnonKey &&
        /^https?:\/\//.test(CONFIG.supabaseUrl) &&
        CONFIG.supabaseAnonKey.length > 20 &&
        !CONFIG.supabaseAnonKey.includes('COLE')
    );

    if (!state.configured || !window.supabase) {
      renderAccount();
      return;
    }

    try {
      state.db = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
    } catch (error) {
      console.error('Erro ao iniciar o Supabase.', error);
      state.configured = false;
      renderAccount();
      return;
    }

    try {
      const { data } = await state.db.auth.getSession();
      state.session = data?.session || null;
      state.user = state.session?.user || null;
      if (state.user) await loadProfile();
    } catch (error) {
      console.warn('Sessão indisponível.', error);
    }

    renderAccount();

    state.db.auth.onAuthStateChange((event, session) => {
      state.session = session || null;
      state.user = session?.user || null;
      if (!state.user) {
        state.profile = null;
        renderAccount();
        notifyAuth();
        return;
      }
      loadProfile().finally(() => {
        renderAccount();
        notifyAuth();
      });
      if (event === 'SIGNED_IN') {
        window.setTimeout(() => {
          document.querySelectorAll('[data-auth-note]').forEach((note) => note.remove());
        }, 50);
      }
    });
  }

  function initMisc() {
    document.querySelectorAll('[data-year]').forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
    hydrateIcons(document);
  }

  async function init() {
    if (state.initialized) return;
    state.initialized = true;
    initMobileNav();
    setActiveNav();
    initHeaderScroll();
    setupAccountEvents();
    initMisc();
    await initAuth();
    state.authResolved = true;
    notifyAuth();
  }

  window.App = {
    icon,
    hydrateIcons,
    escapeHTML,
    shuffle,
    uuid,
    clamp,
    getParam,
    formatNumber,
    formatPercent,
    formatDate,
    dateKey,
    readStore,
    writeStore,
    isCompleted,
    getCompletedTopics,
    markTopicComplete,
    getStreak,
    recordAttempt,
    fetchRemoteData,
    mergeAttempts,
    mergeCompleted,
    getStats,
    practiceUrl,
    lessonUrl,
    toast,
    onAuthChange,
    signOut,
    getDisplayName,
    getInitials,
    renderAccount,
    closeMobileNav,
    getState() {
      return {
        db: state.db,
        session: state.session,
        user: state.user,
        profile: state.profile,
        configured: state.configured
      };
    },
    get configured() {
      return state.configured;
    },
    get db() {
      return state.db;
    },
    get user() {
      return state.user;
    },
    get profile() {
      return state.profile;
    }
  };

  window.App.ready = init();
})();
