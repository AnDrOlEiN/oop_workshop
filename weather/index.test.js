/* eslint-env node, jest */

import WeatherCollector, { DarkSkyService, OWMService, GeocodingService } from '.';
import GlobalConstants from '../globalConstants';

const weatherForBerlin = { weather: 'cloudy' };
const weatherForMinsk = { weather: 'sunny' };
const coordinatesForBerlin = { lat: 1, lon: 2 };
const coordinatesForMinsk = { lat: 3, lon: 4 };

const fakeHttpClient = (url, options) => {
  if (url.match(GlobalConstants.geocodingServiceURL) && options.params.q === 'minsk') {
    return { data: [coordinatesForMinsk] };
  }
  if (url.match(GlobalConstants.geocodingServiceURL) && options.params.q === 'berlin') {
    return { data: [coordinatesForBerlin] };
  }
  if (
    url.match(GlobalConstants.darkSkyURL)
    && url.match(`${coordinatesForBerlin.lat},${coordinatesForBerlin.lon}`)
  ) {
    return { data: weatherForBerlin };
  }
  if (
    url.match(GlobalConstants.OWMURL)
    && url.match(`lat=${coordinatesForMinsk.lat}`)
    && url.match(`lon=${coordinatesForMinsk.lon}`)
  ) {
    return { data: weatherForMinsk };
  }
  return null;
};

const geocodingService = new GeocodingService(fakeHttpClient).locate;

describe('Weather', () => {
  it('should work for Berlin using DarkSky', async () => {
    const darkSky = new DarkSkyService(fakeHttpClient, geocodingService);
    const weather = new WeatherCollector(darkSky);
    const result = await weather.collectWeather('berlin');
    expect(result).toEqual(weatherForBerlin);
  });

  it('should work for Minsk using OMW', async () => {
    const omw = new OWMService(fakeHttpClient, geocodingService);
    const weather = new WeatherCollector(omw);
    const result = await weather.collectWeather('minsk');
    expect(result).toEqual(weatherForMinsk);
  });
});
