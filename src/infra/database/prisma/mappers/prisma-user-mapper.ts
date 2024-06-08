import { User as PrismaUser } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/enterprise/entities/user'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        createdAt: raw.createdAt,
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(user: User): PrismaUser {
    return {
      id: user.id.toValue(),
      createdAt: user.createdAt,
      name: user.name,
    }
  }
}
