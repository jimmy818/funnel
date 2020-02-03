// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
  // production: false
// };



export const environment = {
	production: false,
	firebase: {
		 apiKey: "AIzaSyB39tC9OyJ-N6J8k-FOonCmDaRKwe8C_9c",
    authDomain: "funnel-spin-api.firebaseapp.com",
    databaseURL: "https://funnel-spin-api.firebaseio.com",
    projectId: "funnel-spin-api",
    storageBucket: "funnel-spin-api.appspot.com",
    messagingSenderId: "248023086452",
    appId: "1:248023086452:web:ff86117ac3f6f5674ce821",
    measurementId: "G-BQVVDJ8W6J"
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
