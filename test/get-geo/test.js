/* eslint-env node, mocha, chai */

import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GeoInfo from '../../get-geo';

const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('GeoInfo', () => {
  const mock = new MockAdapter(axios);
  beforeEach(() => {
    mock.reset();
  });
  const dataForIp = {
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
  };
  const dataWithoutIP = {
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
  };
  it('should work without arguments', async () => {
    mock.onGet('http://ip-api.com/json/').reply(200, dataWithoutIP);
    const result = await new GeoInfo().getLocationByIP();
    expect(result).to.deep.equal(dataWithoutIP);
  });

  it('should work with valid arguments', async () => {
    mock.onGet('http://ip-api.com/json/1.2.3.4').reply(200, dataForIp);
    const result = await new GeoInfo().getLocationByIP('1.2.3.4');
    expect(result).to.deep.equal(dataForIp);
  });

  it('should not work with not valid arguments', () => {
    const request = new GeoInfo().getLocationByIP('not valid');
    return expect(request).to.be.rejectedWith(Error);
  });
});
