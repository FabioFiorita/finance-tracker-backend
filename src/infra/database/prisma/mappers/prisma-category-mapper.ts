import { Category as PrismaCategory } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Category } from '@/domain/enterprise/entities/category'

export class PrismaCategoryMapper {
  static toDomain(raw: PrismaCategory): Category {
    return Category.create(
      {
        createdAt: raw.createdAt,
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(category: Category): PrismaCategory {
    return {
      id: category.id.toValue(),
      createdAt: category.createdAt,
      name: category.name,
    }
  }
}
