import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Category } from '@/domain/enterprise/entities/category'
import { PrismaCategoryMapper } from '@/infra/database/prisma/mappers/prisma-category-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeCategory(
  override: Partial<Category> = {},
  id?: UniqueEntityID,
) {
  return Category.create(
    {
      id: new UniqueEntityID(),
      name: faker.commerce.department(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class CategoryFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaCategory(data: Partial<Category> = {}) {
    const category = makeCategory(data)

    await this.prisma.category.create({
      data: PrismaCategoryMapper.toPersistence(category),
    })

    return category
  }
}
