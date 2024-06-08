import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/enterprise/entities/user'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeUser(override: Partial<User> = {}, id?: UniqueEntityID) {
  return User.create(
    {
      id: new UniqueEntityID(),
      createdAt: new Date(),
      name: faker.person.fullName(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class UserFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaUser(data: Partial<User> = {}) {
    const user = makeUser(data)

    await this.prisma.user.create({
      data: PrismaUserMapper.toPersistence(user),
    })

    return user
  }
}
