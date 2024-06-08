import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transaction } from '@/domain/enterprise/entities/transaction'

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
      createdAt: new Date(),
      description: faker.finance.transactionDescription(),
      amount: Number(faker.finance.amount()),
      userId: makeUser().id,
      categoryId: makeCategory().id,
      isIncome: faker.datatype.boolean(),
      isInstallment: faker.datatype.boolean(),
      isRecurring: faker.datatype.boolean(),
      methodId: makeMethod().id,
      purchaseDate: faker.date.past(),
      ...override,
    },
    id,
  )
}
