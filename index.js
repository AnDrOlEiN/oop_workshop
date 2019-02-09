#!/usr/bin/env node

import program from 'commander';
import GeoInfo from './get-geo';
import Pipeline from './pipeline';

program
  .command('get-geo [ip]')
  .description('Simple utility for getting location by IP')
  .action(async (ip) => {
    const geoInfo = new GeoInfo();
    if (ip) {
      const result = await geoInfo.getLocationByIP(ip);
      console.log(result);
    } else {
      const result = await geoInfo.getLocationByIP();
      console.log(result);
    }
  })
  .command('pipeline')
  .action(() => Pipeline());

program.parse(process.argv);
