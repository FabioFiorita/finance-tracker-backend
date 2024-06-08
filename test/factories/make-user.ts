import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/enterprise/entities/user'

export function makeUser(override: Partial<User> = {}, id?: UniqueEntityID) {
  return User.create(
    {
      id: new UniqueEntityID(),
      createdAt: new Date(),
      name: faker.person.fullName(),
      methods: [],
      transactions: [],
      ...override,
    },
    id,
  )
}
