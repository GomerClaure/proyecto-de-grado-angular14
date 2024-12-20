// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  backendUrl: 'http://localhost:8000/api',
  backendStorageUrl: 'http://localhost:8000',
  frontDominio: 'http://localhost:4200',
  websocketConfig:{
    key: 'd28cefd4194509d86d53',
    cluster: 'sa1',
    wsHost: 'localhost',
    // wsPort: 6001,
    // forceTLS: false,
    // enabledTransports: ['ws'],
    // wssPort: 6001,
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
