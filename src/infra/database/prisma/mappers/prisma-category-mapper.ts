import { Category as PrismaCategory, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Category } from '@/domain/enterprise/entities/category'

export class PrismaCategoryMapper {
  static toDomain(raw: PrismaCategory): Category {
    return Category.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(
    category: Category,
  ): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id.toValue(),
      name: category.name,
    }
  }
}
