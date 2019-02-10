/* eslint-env node, jest */

import WeatherCollector from '.';

const weatherForBerlin = {};
const weatherForMinsk = {};

class StubService {
  getWeather(lat, lon) {
    if (lat === '1' && lon === '2') this.result = { data: weatherForBerlin };
    else if (lat === '3' && lon === '4') this.result = { data: weatherForMinsk };
    return this.result;
  }
}

const stubLocate = (city) => {
  if (city === 'minsk') return { data: [{ lat: '1', lon: '2' }] };
  if (city === 'berlin') return { data: [{ lat: '3', lon: '4' }] };
  return null;
};

describe('Weather', () => {
  it('should work for Berlin', async () => {
    const stubService = new StubService('berlin');
    const weather = new WeatherCollector(stubService, stubLocate);
    const result = await weather.collectWeather('berlin');
    expect(result).toEqual(weatherForBerlin);
  });

  it('should work for Minsk', async () => {
    const stubService = new StubService('minsk');
    const weather = new WeatherCollector(stubService, stubLocate);
    const result = await weather.collectWeather('minsk');
    expect(result).toEqual(weatherForMinsk);
  });

  it('should not work without city', async () => {
    const stubService = new StubService('');
    const weather = new WeatherCollector(stubService, stubLocate);
    expect(weather.collectWeather('')).rejects.toThrow(Error('There is no such city'));
  });
});
