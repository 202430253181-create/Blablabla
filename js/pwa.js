/* BlablablaAbel — registro do PWA, instalação e avisos de conexão. */
(function () {
  'use strict';

  let deferredPrompt = null;
  const standalone =
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  function installButtons() {
    return document.querySelectorAll('[data-install-app]');
  }

  function syncInstallButtons() {
    const canShow = Boolean(deferredPrompt) && !standalone;
    installButtons().forEach((button) => {
      button.hidden = !canShow;
    });
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    syncInstallButtons();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    syncInstallButtons();
    if (window.App) App.toast('Aplicativo instalado! Agora você pode estudar offline.', 'success', 5000);
  });

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-install-app]');
    if (!button || !deferredPrompt) return;
    deferredPrompt.prompt();
    try {
      const choice = await deferredPrompt.userChoice;
      if (choice?.outcome === 'accepted') {
        if (window.App) App.toast('Instalando o BlablablaAbel...', 'success');
      }
    } catch (error) {
      console.warn('Instalação não concluída.', error);
    }
    deferredPrompt = null;
    syncInstallButtons();
  });

  if ('serviceWorker' in navigator && /^https?:/.test(window.location.protocol)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then((registration) => {
          registration.addEventListener('updatefound', () => {
            const worker = registration.installing;
            if (!worker) return;
            worker.addEventListener('statechange', () => {
              if (worker.state === 'installed' && navigator.serviceWorker.controller && window.App) {
                App.toast('Nova versão disponível. Recarregue a página para atualizar.', 'info', 7000);
              }
            });
          });
        })
        .catch((error) => console.warn('Service Worker não registrado.', error));
    });
  }

  window.addEventListener('offline', () => {
    if (window.App) App.toast('Você está offline. Os conteúdos já salvos continuam disponíveis.', 'info', 5000);
  });

  window.addEventListener('online', () => {
    if (window.App) App.toast('Conexão restabelecida.', 'success');
  });

  syncInstallButtons();
})();
