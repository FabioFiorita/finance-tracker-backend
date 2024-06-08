import { Injectable } from '@nestjs/common'

import { CategoriesRepository } from '@/domain/application/repositories/categories-repository'

import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    const categories = await this.prisma.category.findMany()

    return categories.map(PrismaCategoryMapper.toDomain)
  }

  public async findById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { transactions: true },
    })

    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }
}
