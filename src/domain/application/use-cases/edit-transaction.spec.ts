import { makeTransaction } from 'test/factories/make-transaction'
import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transactions-repository'

import { EditTransactionUseCase } from './edit-transaction'

describe('Delete Transaction', () => {
  let inMemoryRepository: InMemoryTransactionsRepository
  let sut: EditTransactionUseCase

  beforeEach(() => {
    inMemoryRepository = new InMemoryTransactionsRepository()
    sut = new EditTransactionUseCase(inMemoryRepository)
  })

  it('should edit a transaction', async () => {
    const transaction = makeTransaction()
    inMemoryRepository.items.push(transaction)

    const result = await sut.execute({
      transactionId: transaction.id.toValue(),
      amount: 200,
      purchaseDate: transaction.purchaseDate,
      description: 'new description',
      isIncome: transaction.isIncome,
      isRecurring: transaction.isRecurring,
      isInstallment: transaction.isInstallment,
      category: transaction.category,
      method: transaction.method,
      user: transaction.user,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryRepository.items.length).toBe(1)
    if (result.isRight()) {
      expect(inMemoryRepository.items[0]).toEqual(result.value?.transaction)
    }
  })
})
