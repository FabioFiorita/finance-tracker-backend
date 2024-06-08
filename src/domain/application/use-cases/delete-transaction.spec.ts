import { makeTransaction } from 'test/factories/make-transaction'
import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transaction-repository'

import { DeleteTransactionUseCase } from './delete-transaction'

describe('Delete Transaction', () => {
  let inMemoryRepository: InMemoryTransactionsRepository
  let sut: DeleteTransactionUseCase

  beforeEach(() => {
    inMemoryRepository = new InMemoryTransactionsRepository()
    sut = new DeleteTransactionUseCase(inMemoryRepository)
  })

  it('should delete a transaction', async () => {
    const transaction = makeTransaction()
    inMemoryRepository.items.push(transaction)

    const result = await sut.execute({
      transactionId: transaction.id.toValue(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryRepository.items.length).toBe(0)
  })
})
