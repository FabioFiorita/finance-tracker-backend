import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Method } from '@/domain/enterprise/entities/method'
import { PrismaMethodMapper } from '@/infra/database/prisma/mappers/prisma-method-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

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
      ...override,
    },
    id,
  )
}

@Injectable()
export class MethodFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaMethod(data: Partial<Method> = {}) {
    const method = makeMethod(data)

    await this.prisma.method.create({
      data: PrismaMethodMapper.toPersistence(method),
    })

    return method
  }
}
