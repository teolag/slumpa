import { expect } from 'chai'
import { Slumpa } from '../src'

describe('Slumpa', () => {
  context('Constructor and setSeed', () => {
    it('should produce same output with same string seed', () => {
      const s = new Slumpa('banan')
      const floats1 = s.floats(10)
      s.setSeed('banan')
      const floats2 = s.floats(10)
      expect(floats1).to.be.eql(floats2)
    })
  })

  context('Integer', () => {
    it('should return same integers every time with same seed', () => {
      const s = new Slumpa(345)
      expect(s.integer(100, 200)).to.equal(155)
      expect(s.integer(100, 200)).to.equal(171)
      expect(s.integer(100, 200)).to.equal(147)
    })

    it('should produce integers with the same distribution for each number', () => {
      const s = new Slumpa()
      const iterations = 1000
      const hits = new Map<number, number>([
        [6, 0],
        [7, 0],
        [8, 0],
      ])
      for (let i = 0; i < iterations; i++) {
        const res = s.integer(6, 8)
        hits.set(res, (hits.get(res) ?? 0) + 1)
        expect([6, 7, 8]).to.include(res)
      }
      expect((hits.get(6) ?? 0) / iterations).to.be.approximately(0.333, 0.1)
      expect((hits.get(7) ?? 0) / iterations).to.be.approximately(0.333, 0.1)
      expect((hits.get(8) ?? 0) / iterations).to.be.approximately(0.333, 0.1)
    })
  })

  context('Float', () => {
    it('should return same float every time with same seed', () => {
      const s = new Slumpa(985)
      expect(s.float(100, 200)).to.equal(100.39898133836687)
      expect(s.float(100, 200)).to.equal(199.14964502677321)
      expect(s.float(100, 200)).to.equal(121.57074739225209)
    })

    it('should not produce floats below min or abouve max', () => {
      const s = new Slumpa(985)
      const min = -2
      const max = -1
      for (let i = 0; i < 1000; i++) {
        const float = s.float(min, max)
        expect(float).to.not.be.lessThan(min)
        expect(float).to.not.be.greaterThan(max)
      }
    })
  })

  context('Integers', () => {
    it('should produce an array of expected integers with same seed', () => {
      const s = new Slumpa(234)
      const numbers = s.integers(20, 0, 100)
      const expectedNumbers = [40, 50, 27, 89, 32, 33, 27, 9, 35, 56, 4, 89, 26, 69, 78, 64, 98, 32, 40, 60]
      expect(numbers).to.eql(expectedNumbers)
    })
  })

  context('Shuffle', () => {
    it('should shuffle the array the same way with fixed seed', () => {
      const s = new Slumpa(8)
      const inputArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
      const expectedOutput = ['I', 'F', 'A', 'C', 'L', 'H', 'J', 'E', 'K', 'D', 'G', 'B']
      const shuffled = s.shuffle(inputArray)
      expect(shuffled).to.eql(expectedOutput)
    })
  })

  context('Items', () => {
    it('should return correct number of random items', () => {
      const s = new Slumpa(8)
      const inputArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
      const expectedArray = ['I', 'F', 'A']

      const items = s.items(3, inputArray)
      expect(items).to.have.length(3)
      expect(items).to.eql(expectedArray)
    })

    it('should not shuffle the input array', () => {
      const s = new Slumpa(8)
      const inputArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
      const expectedArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

      s.items(3, inputArray)

      expect(inputArray).to.eql(expectedArray)
    })
  })
})
