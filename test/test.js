/* eslint-env mocha */

const path = require('node:path')

const chai = require('chai')
const expect = chai.expect

const indexerService = require('../lib/indexer-service')

describe('indexer service tests', function () {
  const fixturesPath = path.join(__dirname, 'fixtures')

  it('search for non-existent package', () => {
    const results = indexerService.search(
      fixturesPath,
      [
        './test-package1/package.json',
        './test-package2/package.json',
        './test-package3/package.json',
        './test-package4/package.json'
      ],
      [
        ['non-existent-package', '1.00']
      ])
    console.log(results)
    expect(results)
      .to.have.property('packageMatchCount')
      .that.is.a('number')
      .and.equals(0)
    expect(results)
      .to.have.property('packageAndVersionMatchCount')
      .that.is.a('number')
      .and.equals(0)
  })

  it('search for single instance of test-package-wed@2.5.0', () => {
    const results = indexerService.search(
      fixturesPath,
      [
        './test-package1/package.json',
        './test-package2/package.json',
        './test-package3/package.json',
        './test-package4/package.json'
      ],
      [
        ['test-package-wed', '2.5.0']
      ])
    console.log(results)
    expect(results)
      .to.have.property('packageMatchCount')
      .that.is.a('number')
      .and.equals(3)
    expect(results)
      .to.have.property('packageAndVersionMatchCount')
      .that.is.a('number')
      .and.equals(1)
  })

  it('search for 2 instances of shady-package@13.13', () => {
    const results = indexerService.search(
      fixturesPath,
      [
        './test-package1/package.json',
        './test-package2/package.json',
        './test-package3/package.json',
        './test-package4/package.json'
      ],
      [
        ['shady-package', '13.13']
      ])
    console.log(results)
    expect(results)
      .to.have.property('packageMatchCount')
      .that.is.a('number')
      .and.equals(1)
    expect(results)
      .to.have.property('packageAndVersionMatchCount')
      .that.is.a('number')
      .and.equals(2)
  })
})
