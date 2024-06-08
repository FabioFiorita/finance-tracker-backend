import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Method } from '@/domain/enterprise/entities/method'

import { makeUser } from './make-user'

export function makeMethod(
  override: Partial<Method> = {},
  id?: UniqueEntityID,
) {
  return Method.create(
    {
      id: new UniqueEntityID(),
      createdAt: new Date(),
      name: faker.finance.transactionType(),
      userId: makeUser().id,
      transactions: [],
      ...override,
    },
    id,
  )
}
