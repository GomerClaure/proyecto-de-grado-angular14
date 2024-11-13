export const environment = {
  production: false,
  backendUrl: ' https://proyecto-grado-backend.newar.cloud/api',
  backendStorageUrl: ' https://proyecto-grado-backend.newar.cloud',
  frontDominio: ' https://proyecto-grado.newar.cloud/',
  websocketConfig:{
    key: '1234',
    cluster: 'mt1',
    wsHost: '192.168.0.15',
    wsPort: 6001,
    forceTLS: false,
    enabledTransports: ['wss'],
    wssPort: 6001,
  }
};
