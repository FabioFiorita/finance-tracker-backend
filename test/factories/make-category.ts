import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Category } from '@/domain/enterprise/entities/category'

export function makeCategory(
  override: Partial<Category> = {},
  id?: UniqueEntityID,
) {
  return Category.create(
    {
      id: new UniqueEntityID(),
      createdAt: new Date(),
      name: faker.commerce.department(),
      transactions: [],
      ...override,
    },
    id,
  )
}
