#!/usr/bin/env node

import program from 'commander';
import WeatherService, { DarkSkyService, OWMService } from './weather';

program
  .usage('[options] <city>')
  .option('-s, --service <service>', 'WeatherService')
  .parse(process.argv);

const [city] = program.args;
const serviceName = program.service;

if (!city) {
  console.log("City can't be empty");
}
let service;
if (!serviceName) {
  console.log('Choose service with --service');
} else if (serviceName === 'darksky') {
  service = new DarkSkyService();
} else if (serviceName === 'omw') {
  service = new OWMService();
} else {
  throw Error(`There is no ${serviceName} service`);
}

new WeatherService(service).collectWeather(city).then(result => console.log(result));
