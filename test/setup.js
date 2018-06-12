/* eslint-disable no-process-env */


const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const config = require('./fixtures/config');
const data = require('./fixtures/data/data');

try {
  chai.should();
  chai.use(chaiAsPromised);
  global.expect = chai.expect;
  global.config = config;
  global.data = data;
} catch (e) {
  console.trace(e);
}
