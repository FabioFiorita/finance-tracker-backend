import { makeMethod } from 'test/factories/make-method'
import { InMemoryMethodsRepository } from 'test/repositories/in-memory-methods-repository'

import { FetchMethodsUseCase } from './fetch-methods'

describe('Fetch Method Methods', () => {
  let inMemoryRepository: InMemoryMethodsRepository
  let sut: FetchMethodsUseCase

  beforeEach(() => {
    inMemoryRepository = new InMemoryMethodsRepository()
    sut = new FetchMethodsUseCase(inMemoryRepository)
  })

  it('should fetch a method methods', async () => {
    inMemoryRepository.items.push(makeMethod(), makeMethod())

    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.methods.length).toBe(2)
  })
})
