/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { MongoHelper as sut } from './mongo-helper'

describe('Tests for "Mongo Helper" class', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('SHOULD reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('account')
    expect(accountCollection).toBeTruthy()

    await sut.disconnect()

    accountCollection = await sut.getCollection('account')
    expect(accountCollection).toBeTruthy()
  })
})
