#!/usr/bin/env node

import program from 'commander';
import GeoInfo from './get-geo';

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
  });
program.parse(process.argv);
