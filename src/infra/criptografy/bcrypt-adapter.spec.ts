import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'valid_hash'
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    const salt = 12
    const sut = new BcryptAdapter(salt)
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash in success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('valid_hash')
  })
})
