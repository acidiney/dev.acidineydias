import { describe, expect, it } from 'vitest'
import { capitalize, formateDate } from '../../app/filters'

describe('filters', () => {
  describe('formateDate', () => {
    it('formats a date in Portuguese locale', () => {
      const date = new Date('2024-03-15T12:00:00Z')
      const formatted = formateDate(date)

      expect(formatted).toContain('15')
      expect(formatted).toContain('mar')
      expect(formatted).toContain('2024')
    })

    it('handles string dates', () => {
      const formatted = formateDate('2024-12-25T00:00:00Z' as unknown as Date)

      expect(formatted).toContain('2024')
    })
  })

  describe('capitalize', () => {
    it('capitalizes the first letter and lowercases the rest', () => {
      expect(capitalize('HELLO')).toBe('Hello')
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('Hello World')).toBe('Hello world')
    })

    it('handles empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A')
    })
  })
})
