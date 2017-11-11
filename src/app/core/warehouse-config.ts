import {NgForageConfig, NgForageOptions} from 'ngforage';

export const config: NgForageOptions  = {
  driver: [
      NgForageConfig.DRIVER_INDEXEDDB,
      NgForageConfig.DRIVER_LOCALSTORAGE,
      NgForageConfig.DRIVER_WEBSQL
  ],
  name: 'StarOrganizr',
  version: 1.0,
  storeName: 'star_organizr', // Should be alphanumeric, with underscores.
  description: 'An application to organize your github stars'
};
