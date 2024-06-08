import { makeTransaction } from 'test/factories/make-transaction'
import { makeUser } from 'test/factories/make-user'
import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transactions-repository'

import { FetchUserTransactionsUseCase } from './fetch-user-transactions'

describe('Fetch User Transactions', () => {
  let inMemoryRepository: InMemoryTransactionsRepository
  let sut: FetchUserTransactionsUseCase

  beforeEach(() => {
    inMemoryRepository = new InMemoryTransactionsRepository()
    sut = new FetchUserTransactionsUseCase(inMemoryRepository)
  })

  it('should fetch a user transactions', async () => {
    const user = makeUser()
    inMemoryRepository.items.push(
      makeTransaction({ userId: user.id }),
      makeTransaction({ userId: user.id }),
    )

    const result = await sut.execute({
      userId: user.id.toValue(),
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.transactions.length).toBe(2)
  })

  it('should be paginated', async () => {
    const user = makeUser()
    for (let i = 0; i < 25; i++) {
      inMemoryRepository.items.push(makeTransaction({ userId: user.id }))
    }

    const result = await sut.execute({
      userId: user.id.toValue(),
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.transactions.length).toBe(5)
  })
})
