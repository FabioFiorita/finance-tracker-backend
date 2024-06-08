import { Injectable } from '@nestjs/common'

import { MethodsRepository } from '@/domain/application/repositories/methods-repository'

import { PrismaMethodMapper } from '../mappers/prisma-method-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaMethodsRepository implements MethodsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    const methods = await this.prisma.method.findMany()

    return methods.map(PrismaMethodMapper.toDomain)
  }

  public async findById(id: number) {
    const method = await this.prisma.method.findUnique({ where: { id } })

    if (!method) {
      return null
    }

    return PrismaMethodMapper.toDomain(method)
  }
}
