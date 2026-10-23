/* Entrar e criar conta com Supabase Auth. */
(function () {
  'use strict';

  const state = {
    tab: 'login',
    mode: 'login',
    recovery: false,
    hashError: ''
  };

  function safeNext() {
    const next = App.getParam('next', 'desempenho.html');
    return /^[a-z0-9_-]+\.html([?#].*)?$/i.test(next) ? next : 'desempenho.html';
  }

  function showMessage(text, type = 'error') {
    const container = document.getElementById('auth-message');
    if (!container) return;
    const iconName = type === 'error' ? 'x-circle' : type === 'success' ? 'check-circle' : 'info';
    container.innerHTML = `<div class="form-message form-message--${type}">${App.icon(iconName)}<span>${App.escapeHTML(text)}</span></div>`;
  }

  function clearMessage() {
    const container = document.getElementById('auth-message');
    if (container) container.innerHTML = '';
  }

  function setLoading(button, loading) {
    if (!button) return;
    button.disabled = loading;
    button.classList.toggle('btn--loading', loading);
  }

  function setHeading(title, subtitle) {
    const heading = document.getElementById('auth-main-heading');
    const sub = document.getElementById('auth-main-sub');
    if (heading) heading.textContent = title;
    if (sub) sub.textContent = subtitle;
  }

  function hideAllForms() {
    ['login-form', 'signup-form', 'reset-form', 'update-password-form', 'auth-logged'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.hidden = true;
    });
  }

  function setTab(tab) {
    state.tab = tab === 'signup' ? 'signup' : 'login';
    state.mode = state.tab;
    state.recovery = false;
    hideAllForms();
    const tabs = document.getElementById('auth-tabs');
    if (tabs) tabs.hidden = false;
    const form = document.getElementById(state.tab === 'signup' ? 'signup-form' : 'login-form');
    if (form) form.hidden = false;
    document.querySelectorAll('[data-auth-tab]').forEach((button) => {
      const isActive = button.getAttribute('data-auth-tab') === state.tab;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });
    setHeading(
      state.tab === 'signup' ? 'Criar sua conta' : 'Entrar na sua conta',
      state.tab === 'signup'
        ? 'Leve seu progresso para qualquer aparelho e participe do ranking.'
        : 'Continue de onde parou e mantenha seu progresso salvo.'
    );
    clearMessage();
    App.hydrateIcons();
  }

  function showReset() {
    state.mode = 'reset';
    state.recovery = false;
    hideAllForms();
    const tabs = document.getElementById('auth-tabs');
    if (tabs) tabs.hidden = true;
    const form = document.getElementById('reset-form');
    if (form) form.hidden = false;
    setHeading('Recuperar senha', 'Enviaremos um link para você criar uma nova senha.');
    clearMessage();
    document.getElementById('reset-email')?.focus();
  }

  function showRecovery() {
    state.mode = 'recovery';
    state.recovery = true;
    hideAllForms();
    const tabs = document.getElementById('auth-tabs');
    if (tabs) tabs.hidden = true;
    const setup = document.getElementById('auth-setup');
    if (setup) setup.hidden = true;
    const form = document.getElementById('update-password-form');
    if (form) form.hidden = false;
    setHeading('Criar nova senha', 'Escolha uma nova senha para acessar sua conta.');
    clearMessage();
    App.hydrateIcons();
  }

  function showLogged(user) {
    state.mode = 'logged';
    state.recovery = false;
    hideAllForms();
    const tabs = document.getElementById('auth-tabs');
    if (tabs) tabs.hidden = true;
    const setup = document.getElementById('auth-setup');
    if (setup) setup.hidden = true;
    const logged = document.getElementById('auth-logged');
    if (logged) logged.hidden = false;
    const name = App.getDisplayName();
    const avatar = document.getElementById('logged-avatar');
    const nameEl = document.getElementById('logged-name');
    const emailEl = document.getElementById('logged-email');
    if (avatar) avatar.textContent = App.getInitials(name);
    if (nameEl) nameEl.textContent = name;
    if (emailEl) emailEl.textContent = user.email || '';
    setHeading('Você já está conectado', 'Seu progresso está sendo salvo na nuvem.');
  }

  function render() {
    const { user, configured } = App.getState();
    const setup = document.getElementById('auth-setup');
    if (setup) setup.hidden = configured;
    if (state.recovery) {
      showRecovery();
      return;
    }
    if (user) {
      showLogged(user);
      return;
    }
    setTab(state.tab);
  }

  function applyConfigState() {
    const configured = App.configured;
    const setup = document.getElementById('auth-setup');
    if (setup) setup.hidden = configured;
  }

  function translateError(error) {
    const message = String(error?.message || '').toLowerCase();
    if (message.includes('invalid login credentials')) return 'E-mail ou senha incorretos. Confira os dados e tente novamente.';
    if (message.includes('email not confirmed')) return 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.';
    if (message.includes('user already registered')) return 'Este e-mail já possui uma conta. Tente entrar.';
    if (message.includes('password should be at least')) return 'A senha precisa ter pelo menos 6 caracteres.';
    if (message.includes('unable to validate email')) return 'Digite um e-mail válido.';
    if (message.includes('email rate limit')) return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
    if (message.includes('signup is disabled')) return 'O cadastro está desativado no momento.';
    if (message.includes('network')) return 'Não foi possível conectar. Verifique sua internet e tente novamente.';
    return 'Não foi possível concluir a operação. Tente novamente.';
  }

  async function handleLogin(event) {
    event.preventDefault();
    clearMessage();
    if (!App.configured || !App.db) {
      showMessage('A conta ainda não está disponível porque o Supabase não foi configurado. Você pode continuar como visitante.');
      return;
    }
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;
    if (!email || !password) {
      showMessage('Preencha o e-mail e a senha para entrar.');
      return;
    }
    const button = document.getElementById('login-submit');
    setLoading(button, true);
    try {
      const { error } = await App.db.auth.signInWithPassword({ email, password });
      if (error) throw error;
      App.toast('Bem-vindo de volta!', 'success');
      window.location.href = safeNext();
    } catch (error) {
      showMessage(translateError(error));
      setLoading(button, false);
    }
  }

  async function handleSignup(event) {
    event.preventDefault();
    clearMessage();
    if (!App.configured || !App.db) {
      showMessage('A conta ainda não está disponível porque o Supabase não foi configurado. Você pode continuar como visitante.');
      return;
    }
    const form = document.getElementById('signup-form');
    if (form && !form.reportValidity()) return;
    const nome = document.getElementById('signup-name')?.value.trim();
    const email = document.getElementById('signup-email')?.value.trim();
    const password = document.getElementById('signup-password')?.value;
    const nivel = document.getElementById('signup-level')?.value || 'fundamental-2';
    if (!nome || nome.length < 2) {
      showMessage('Digite seu nome para criarmos a conta.');
      return;
    }
    if (!email || !password || password.length < 6) {
      showMessage('Preencha um e-mail válido e uma senha com pelo menos 6 caracteres.');
      return;
    }

    const button = document.getElementById('signup-submit');
    setLoading(button, true);
    try {
      const { data, error } = await App.db.auth.signUp({
        email,
        password,
        options: {
          data: { nome, nivel },
          emailRedirectTo: `${window.location.origin}${window.location.pathname}`
        }
      });
      if (error) throw error;
      if (data?.session) {
        App.toast('Conta criada! Bem-vindo ao BlablablaAbel.', 'success');
        window.location.href = safeNext();
        return;
      }
      form?.reset();
      showMessage(
        'Conta criada! Se a confirmação por e-mail estiver ativada no Supabase, confira sua caixa de entrada antes de entrar.',
        'success'
      );
      setLoading(button, false);
    } catch (error) {
      showMessage(translateError(error));
      setLoading(button, false);
    }
  }

  async function handleReset(event) {
    event.preventDefault();
    clearMessage();
    if (!App.configured || !App.db) {
      showMessage('A recuperação de senha estará disponível após configurar o Supabase.');
      return;
    }
    const email = document.getElementById('reset-email')?.value.trim();
    if (!email) {
      showMessage('Digite o e-mail da sua conta.');
      return;
    }
    const button = document.getElementById('reset-submit');
    setLoading(button, true);
    try {
      const { error } = await App.db.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${window.location.pathname}?reset=1`
      });
      if (error) throw error;
      showMessage('Se este e-mail estiver cadastrado, você receberá um link para criar uma nova senha.', 'success');
    } catch (error) {
      showMessage(translateError(error));
    } finally {
      setLoading(button, false);
    }
  }

  async function handleUpdatePassword(event) {
    event.preventDefault();
    clearMessage();
    if (!App.configured || !App.db) {
      showMessage('A atualização de senha não está disponível sem o Supabase configurado.');
      return;
    }
    const password = document.getElementById('new-password')?.value;
    if (!password || password.length < 6) {
      showMessage('A nova senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    const button = document.getElementById('update-submit');
    setLoading(button, true);
    try {
      const { error } = await App.db.auth.updateUser({ password });
      if (error) throw error;
      showMessage('Senha atualizada com sucesso. Você será redirecionado.', 'success');
      state.recovery = false;
      window.history.replaceState({}, '', `${window.location.pathname}${window.location.search.replace(/[?&]reset=1/, '')}`);
      window.setTimeout(() => {
        window.location.href = safeNext();
      }, 900);
    } catch (error) {
      showMessage(translateError(error));
      setLoading(button, false);
    }
  }

  function bindPasswordToggles() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-toggle-password]');
      if (!button) return;
      const input = document.getElementById(button.getAttribute('data-toggle-password'));
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      button.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
      button.innerHTML = App.icon(isPassword ? 'eye-off' : 'eye');
    });
  }

  function detectRecovery() {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const hasRecovery = hash.get('type') === 'recovery' || App.getParam('reset') === '1';
    const hashError = hash.get('error_description');
    if (hashError) {
      state.hashError = decodeURIComponent(hashError.replace(/\+/g, ' '));
    }
    if (hasRecovery) {
      state.recovery = true;
      showRecovery();
    }
  }

  function bindEvents() {
    document.querySelectorAll('[data-auth-tab]').forEach((button) => {
      button.addEventListener('click', () => setTab(button.getAttribute('data-auth-tab')));
    });
    document.querySelectorAll('[data-auth-tab-link]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        setTab(link.getAttribute('data-auth-tab-link'));
      });
    });
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    document.getElementById('signup-form')?.addEventListener('submit', handleSignup);
    document.getElementById('reset-form')?.addEventListener('submit', handleReset);
    document.getElementById('update-password-form')?.addEventListener('submit', handleUpdatePassword);
    document.getElementById('forgot-password')?.addEventListener('click', showReset);
    document.getElementById('back-to-login')?.addEventListener('click', (event) => {
      event.preventDefault();
      setTab('login');
    });
    document.getElementById('logout-auth')?.addEventListener('click', async () => {
      const button = document.getElementById('logout-auth');
      setLoading(button, true);
      await App.signOut();
      setLoading(button, false);
      state.tab = 'login';
      render();
    });
    bindPasswordToggles();
  }

  App.ready.then(() => {
    applyConfigState();
    bindEvents();
    detectRecovery();
    if (!state.recovery) {
      render();
      if (state.hashError) showMessage(state.hashError);
    }
    App.onAuthChange(({ user }) => {
      if (state.recovery) return;
      if (user) showLogged(user);
      else {
        applyConfigState();
        setTab(state.tab);
      }
    });
  });
})();
