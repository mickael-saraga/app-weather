// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  OPEN_WEATHER_URL: 'https://api.openweathermap.org/data/2.5/',
  API_ID: '5a4b2d457ecbef9eb2a71e480b947604',
  COUNTRY_ISO_CODE: 'FR',
  lang: 'fr',
  country: 'France',
  units: 'metric',
  storage_zipcodes_key: 'zipcodes',
  paths: {
    forecast: 'forecast'
  },
  queryParams: {
    zipcode: 'zipcode',
    name: 'name',
    latitude: 'lat',
    longoitude: 'lon',
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
