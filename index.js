#!/usr/bin/env node

import program from 'commander';
import GeoInfo from './get-geo';

import Utils from './utils';

program
  .command('get-geo [ip]')
  .description('Simple utility for getting location by IP')
  .action(async (ip) => {
    if (ip) {
      ip.match(Utils.ipRegex)
        ? new GeoInfo(ip).getLocationByIP().then(result => console.log(result))
        : console.error('Argument should be a valid IP');
    } else {
      console.log(new GeoInfo().getLocationByIP().then(result => console.log(result)));
    }
  });

program.parse(process.argv);
