/* eslint-env node, jest */

import WeatherCollector from '.';

const weatherForBerlin = {};
const weatherForMinsk = {};

class StubService {
  getWeather(city) {
    if (city === 'berlin') this.result = { data: weatherForBerlin };
    else if (city === 'minsk') this.result = { data: weatherForMinsk };
    return this.result;
  }
}

describe('Weather', () => {
  it('should work for Berlin', async () => {
    const stubService = new StubService('berlin');
    const weather = new WeatherCollector(stubService);
    const result = await weather.collectWeather('berlin');
    expect(result).toEqual(weatherForBerlin);
  });

  it('should work for Minsk', async () => {
    const stubService = new StubService('minsk');
    const weather = new WeatherCollector(stubService);
    const result = await weather.collectWeather('minsk');
    expect(result).toEqual(weatherForMinsk);
  });

  it('should not work without city', async () => {
    const stubService = new StubService('');
    const weather = new WeatherCollector(stubService);
    expect(weather.collectWeather('')).rejects.toThrow(Error('There is no such city'));
  });
});
