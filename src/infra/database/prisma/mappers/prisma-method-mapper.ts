import { Method as PrismaMethod, Prisma } from '@prisma/client'

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
        name: raw.name,
        userId: new UniqueEntityID(raw.userId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(method: Method): Prisma.MethodUncheckedCreateInput {
    return {
      id: method.id.toValue(),
      name: method.name,
      userId: method.userId.toValue(),
    }
  }
}
