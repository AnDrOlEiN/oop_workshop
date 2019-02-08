#!/usr/bin/env node

const program = require('commander');
const Utils = require('./utils');
const GeoInfo = require('./get-geo');

program
  .command('get-geo [ip]')
  .description('Simple utility for getting location by IP')
  .action((ip) => {
    if (ip) {
      ip.match(Utils.ipRegex)
        ? new GeoInfo(ip).locate().then(result => console.log(result))
        : console.error('Argument should be a valid IP');
    } else {
      console.log(new GeoInfo().locate().then(result => console.log(result)));
    }
  });

program.parse(process.argv);
