import { describe, expect, it } from 'vitest'
import { validateContactBody } from '../../server/api/contact'

describe('contact API', () => {
  describe('validateContactBody', () => {
    it('accepts a valid contact form submission', () => {
      const body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I would like to work with you.',
      }

      expect(() => validateContactBody(body)).not.toThrow()
      expect(validateContactBody(body)).toEqual(body)
    })

    it('throws when name is missing', () => {
      expect(() => validateContactBody({ email: 'john@example.com', message: 'Hi' }))
        .toThrow('name is required')
    })

    it('throws when email is invalid', () => {
      expect(() => validateContactBody({ name: 'John', email: 'not-an-email', message: 'Hi' }))
        .toThrow('valid email')
    })

    it('throws when message is too short', () => {
      expect(() => validateContactBody({ name: 'John', email: 'john@example.com', message: 'Hi' }))
        .toThrow('at least 10 characters')
    })

    it('throws when message is too long', () => {
      const longMessage = 'a'.repeat(5001)
      expect(() => validateContactBody({ name: 'John', email: 'john@example.com', message: longMessage }))
        .toThrow('at most 5000 characters')
    })

    it('trims whitespace from name and email', () => {
      const result = validateContactBody({
        name: '  John Doe  ',
        email: '  john@example.com  ',
        message: 'Hello, I would like to work with you.',
      })

      expect(result.name).toBe('John Doe')
      expect(result.email).toBe('john@example.com')
    })
  })
})
