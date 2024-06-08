import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/application/repositories/users-repository'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    const users = await this.prisma.user.findMany()

    return users.map(PrismaUserMapper.toDomain)
  }

  public async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
