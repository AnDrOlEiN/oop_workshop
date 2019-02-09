/* eslint-env node, jest */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GeoInfo from '.';

const dataWithoutIP = {
  data: {
    as: 'AS3356 Level 3 Communications, Inc.',
    city: 'Newark',
    country: 'United States',
    countryCode: 'US',
    isp: 'Level 3',
    lat: 40.7357,
    lon: -74.1724,
    org: 'Google LLC',
    query: '4.3.2.1',
    region: 'NJ',
    regionName: 'New Jersey',
    status: 'success',
    timezone: 'America/New_York',
    zip: '07175',
  },
};
const dataForIp = {
  data: {
    as: '',
    city: 'South Brisbane',
    country: 'Australia',
    countryCode: 'AU',
    isp: 'Debogon',
    lat: -27.4748,
    lon: 153.017,
    org: '',
    query: '1.2.3.4',
    region: 'QLD',
    regionName: 'Queensland',
    status: 'success',
    timezone: 'Australia/Brisbane',
    zip: '4101',
  },
};

const localSource = (url) => {
  const ip = url.split('/')[4]; // really don't like it
  if (!ip) return dataWithoutIP;
  if (ip === '1.2.3.4') return dataForIp;
  return undefined;
};

describe('GeoInfo', () => {
  const mock = new MockAdapter(axios);
  const geoInfo = new GeoInfo(localSource);
  beforeEach(() => {
    mock.reset();
  });
  it('should work without arguments', async () => {
    const result = await geoInfo.getLocationByIP();
    expect(result).toEqual(dataWithoutIP.data);
  });

  it('should work with valid arguments', async () => {
    mock.onGet('http://ip-api.com/json/1.2.3.4').reply(200, dataForIp);
    const result = await geoInfo.getLocationByIP('1.2.3.4');
    expect(result).toEqual(dataForIp.data);
  });

  it('should not work with not valid arguments', () => {
    const request = geoInfo.getLocationByIP('not valid');
    expect(request).rejects.toEqual(Error('Argument should be a valid IP'));
  });
});
