#!/usr/bin/env node

import program from 'commander';
import WeatherService, { DarkSkyService, OWMService, GeocodingService } from './weather';

program
  .usage('[options] <city>')
  .option('-s, --service <service>', 'WeatherService')
  .option('-k, --apiKey <key>', 'Key for weather service API')
  .option('-gk, --geoApiKey <key>', 'Key for geolocation service API')
  .parse(process.argv);

const [city] = program.args;
const serviceName = program.service;
const { apiKey, geoApiKey } = program;

if (!city) {
  console.log("City can't be empty");
}
let service;
const geoService = new GeocodingService(void 0, geoApiKey);
if (!serviceName) {
  console.log('Choose service with --service');
} else if (serviceName === 'darksky') {
  service = new DarkSkyService(void 0, geoService, apiKey);
} else if (serviceName === 'omw') {
  service = new OWMService(void 0, geoService, apiKey);
} else {
  throw Error(`There is no ${serviceName} service`);
}

new WeatherService(service).collectWeather(city).then(result => console.log(result));
