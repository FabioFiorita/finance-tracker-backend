import dayjs from 'dayjs'
import { makeTransaction } from 'test/factories/make-transaction'
import { InMemoryTransactionsRepository } from 'test/repositories/in-memory-transactions-repository'

import { CreateInstallementTransactionsUseCase } from './create-installement-transaction'

describe('Create Installement Transaction', () => {
  let inMemoryRepository: InMemoryTransactionsRepository
  let sut: CreateInstallementTransactionsUseCase

  beforeEach(() => {
    inMemoryRepository = new InMemoryTransactionsRepository()
    sut = new CreateInstallementTransactionsUseCase(inMemoryRepository)
  })

  it('should create a transaction', async () => {
    const transaction = makeTransaction({
      isInstallment: true,
      installmentNumber: 3,
      initialInstallment: 1,
    })
    inMemoryRepository.items.push(transaction)
    const result = await sut.execute({
      transactionId: transaction.id.toValue(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryRepository.items.length).toBe(3)
    expect(inMemoryRepository.items[0].initialInstallment).toBe(1)
    expect(inMemoryRepository.items[1].initialInstallment).toBe(2)
    expect(inMemoryRepository.items[2].initialInstallment).toBe(3)

    const lastPurchaseDate = dayjs(transaction.purchaseDate)
      .add(2, 'month')
      .toDate()

    expect(inMemoryRepository.items[2].purchaseDate).toEqual(lastPurchaseDate)
  })
})
