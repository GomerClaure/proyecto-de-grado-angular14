export const environment = {
  production: false,
  // backendUrl: 'http://localhost:8000/api',
  // backendStorageUrl: 'http://localhost:8000',
  // frontDominio: 'http://localhost:4200'

  backendUrl: ' http://192.168.0.17:8000/api',
  backendStorageUrl: ' http://192.168.0.17:8000',
  frontDominio: ' http://192.168.0.17:4200',
  websocketConfig:{
    key: '1234',
    cluster: 'mt1',
    wsHost: '192.168.0.17',
    wsPort: 6001,
    forceTLS: false,
    enabledTransports: ['ws'],
    wssPort: 6001,
  }
};
