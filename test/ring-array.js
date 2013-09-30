var expect = require('chai').expect
  , RingArray = require('../')

describe('RingArray', function () {
  describe('module', function () {
    it('should provide a constructor and a factory method', function () {
      expect(RingArray).to.be.a('function')
      expect(RingArray.createRingArray).to.be.a('function')
    })
  })

  describe('constructor', function () {
    it('should throw on undefined size', function () {
      expect(function () {
        new RingArray()
      }).to.throw()
    })

    it('should throw on non-Number size', function () {
      expect(function () {
        new RingArray({})
      }).to.throw()

      expect(function () {
        new RingArray(false)
      }).to.throw()

      expect(function () {
        new RingArray('string')
      }).to.throw()
    })

    it('should throw on negative size', function () {
      expect(function () {
        new RingArray(-1)
      }).to.throw()
    })

    it('should throw on zero', function () {
      expect(function () {
        new RingArray(0)
      }).to.throw()
    })
  })

  describe('push', function () {
  })

  describe('next', function () {
  })

  describe('slice', function () {
  })
})
