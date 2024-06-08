import { Method as PrismaMethod } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Method } from '@/domain/enterprise/entities/method'

export class PrismaMethodMapper {
  static toDomain(raw: PrismaMethod): Method {
    if (!raw) {
      throw new Error('Method not found')
    }

    if (!raw.userId) {
      throw new Error('User not found')
    }

    return Method.create(
      {
        createdAt: raw.createdAt,
        name: raw.name,
        userId: new UniqueEntityID(raw.userId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(method: Method): PrismaMethod {
    return {
      id: method.id.toValue(),
      createdAt: method.createdAt,
      name: method.name,
      userId: method.userId.toValue(),
    }
  }
}
