import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transaction } from '@/domain/enterprise/entities/transaction'
import { PrismaTransactionMapper } from '@/infra/database/prisma/mappers/prisma-transaction-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { makeCategory } from './make-category'
import { makeMethod } from './make-method'
import { makeUser } from './make-user'

export function makeTransaction(
  override: Partial<Transaction> = {},
  id?: UniqueEntityID,
) {
  return Transaction.create(
    {
      id: new UniqueEntityID(),
      description: faker.finance.transactionDescription(),
      amount: Number(faker.finance.amount()),
      user: makeUser(),
      category: makeCategory(),
      isIncome: faker.datatype.boolean(),
      isInstallment: faker.datatype.boolean(),
      isRecurring: faker.datatype.boolean(),
      method: makeMethod(),
      purchaseDate: faker.date.past(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class TransactionFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaTransaction(data: Partial<Transaction> = {}) {
    const transaction = makeTransaction(data)

    await this.prisma.transaction.create({
      data: PrismaTransactionMapper.toPersistence(transaction),
    })

    return transaction
  }
}
