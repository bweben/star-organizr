import {DRIVER_TYPE, WarehouseConfig} from 'ngx-warehouse';

export const config: WarehouseConfig = {
  driver: DRIVER_TYPE.DEFAULT,
  name: 'StarOrganizr',
  version: 0.5,
  storeName: 'star_organizr', // Should be alphanumeric, with underscores.
  description: 'An application to organize your github stars'
};
