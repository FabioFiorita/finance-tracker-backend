import { makeCategory } from 'test/factories/make-category'
import { makeTransaction } from 'test/factories/make-transaction'
import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transactions-repository'

import { FetchCategoryTransactionsUseCase } from './fetch-category-transactions'

describe('Fetch Category Transactions', () => {
  let inMemoryRepository: InMemoryTransactionsRepository
  let sut: FetchCategoryTransactionsUseCase

  beforeEach(() => {
    inMemoryRepository = new InMemoryTransactionsRepository()
    sut = new FetchCategoryTransactionsUseCase(inMemoryRepository)
  })

  it('should fetch a category transactions', async () => {
    const category = makeCategory()
    inMemoryRepository.items.push(
      makeTransaction({ categoryId: category.id }),
      makeTransaction({ categoryId: category.id }),
    )

    const result = await sut.execute({
      categoryId: category.id.toValue(),
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.transactions.length).toBe(2)
  })

  it('should be paginated', async () => {
    const category = makeCategory()
    for (let i = 0; i < 25; i++) {
      inMemoryRepository.items.push(
        makeTransaction({ categoryId: category.id }),
      )
    }

    const result = await sut.execute({
      categoryId: category.id.toValue(),
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.transactions.length).toBe(5)
  })
})
