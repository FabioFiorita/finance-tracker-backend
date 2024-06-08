import { makeCategory } from 'test/factories/make-category'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories-repository'

import { FetchCategoriesUseCase } from './fetch-categories'

describe('Fetch Category Categories', () => {
  let inMemoryRepository: InMemoryCategoriesRepository
  let sut: FetchCategoriesUseCase

  beforeEach(() => {
    inMemoryRepository = new InMemoryCategoriesRepository()
    sut = new FetchCategoriesUseCase(inMemoryRepository)
  })

  it('should fetch a category categories', async () => {
    inMemoryRepository.items.push(makeCategory(), makeCategory())

    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.categories.length).toBe(2)
  })
})
