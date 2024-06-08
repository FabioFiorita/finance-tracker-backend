import { makeMethod } from 'test/factories/make-method'
import { makeTransaction } from 'test/factories/make-transaction'
import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transactions-repository'

import { FetchMethodTransactionsUseCase } from './fetch-method-transactions'

describe('Fetch Method Transactions', () => {
  let inMemoryRepository: InMemoryTransactionsRepository
  let sut: FetchMethodTransactionsUseCase

  beforeEach(() => {
    inMemoryRepository = new InMemoryTransactionsRepository()
    sut = new FetchMethodTransactionsUseCase(inMemoryRepository)
  })

  it('should fetch a method transactions', async () => {
    const method = makeMethod()
    inMemoryRepository.items.push(
      makeTransaction({ methodId: method.id }),
      makeTransaction({ methodId: method.id }),
    )

    const result = await sut.execute({
      methodId: method.id.toValue(),
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.transactions.length).toBe(2)
  })

  it('should be paginated', async () => {
    const method = makeMethod()
    for (let i = 0; i < 25; i++) {
      inMemoryRepository.items.push(makeTransaction({ methodId: method.id }))
    }

    const result = await sut.execute({
      methodId: method.id.toValue(),
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.transactions.length).toBe(5)
  })
})
