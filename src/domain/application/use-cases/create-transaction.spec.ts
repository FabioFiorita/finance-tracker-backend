import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transaction-repository'

import { CreateTransactionUseCase } from './create-transaction'

describe('Create Transaction', () => {
  let inMemoryRepository: InMemoryTransactionsRepository
  let sut: CreateTransactionUseCase

  beforeEach(() => {
    inMemoryRepository = new InMemoryTransactionsRepository()
    sut = new CreateTransactionUseCase(inMemoryRepository)
  })

  it('should create a transaction', async () => {
    const result = await sut.execute({
      amount: 100,
      purchaseDate: new Date(),
      description: 'any_description',
      isIncome: false,
      isRecurring: false,
      isInstallment: false,
      categoryId: 1,
      methodId: 1,
      userId: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryRepository.items.length).toBe(1)
    expect(inMemoryRepository.items[0]).toEqual(result.value?.transaction)
  })
})
