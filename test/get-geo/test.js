/* eslint-env node, mocha */

const { expect } = require('chai');
const GeoInfo = require('../../get-geo/index');

describe('GeoInfo', () => {
  it('should work without arguments', async () => {
    const result = await new GeoInfo().locate();
    expect(result).to.be.an('object');
  });

  it('should work with valid arguments', async () => {
    const result = await new GeoInfo('1.2.3.4.5').locate();
    expect(result).to.be.an('object');
  });

  it('should not work with not valid arguments', async () => {
    const result = await new GeoInfo('not valid').locate();
    expect(result).to.contain({ status: 'fail' });
  });
});
