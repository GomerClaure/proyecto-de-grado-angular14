export const environment = {
  production: true,
  backendUrl: ' http://192.168.0.17:8000/api',
  backendStorageUrl: ' http://192.168.0.17:8000',
  frontDominio: ' http://192.168.0.17:8000:4200',
  websocketConfig:{
    key: '1234',
    cluster: 'mt1',
    wsHost: 'localhost',
    wsPort: 6001,
    forceTLS: false,
    enabledTransports: ['ws'],
    wssPort: 6001,
  }
};
