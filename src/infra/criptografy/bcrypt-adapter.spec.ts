import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'valid_hash'
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    const sut = makeSut()
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash in success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('valid_hash')
  })

  test('Should throw if bcrypt throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())

    const sut = makeSut()
    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
