import { Injectable } from '@nestjs/common'

import { TransactionsRepository } from '@/domain/application/repositories/transactions-repository'
import { Transaction } from '@/domain/enterprise/entities/transaction'

import { PrismaTransactionMapper } from '../mappers/prisma-transaction-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findManyByUser(userId: number, page: number) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        category: true,
        method: true,
        user: true,
      },
    })

    return transactions.map(PrismaTransactionMapper.toDomain)
  }

  public async findManyByCategory(categoryId: number, page: number) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        categoryId,
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        category: true,
        method: true,
        user: true,
      },
    })

    return transactions.map(PrismaTransactionMapper.toDomain)
  }

  public async findManyByMethod(methodId: number, page: number) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        methodId,
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        category: true,
        method: true,
        user: true,
      },
    })

    return transactions.map(PrismaTransactionMapper.toDomain)
  }

  public async findById(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        category: true,
        method: true,
        user: true,
      },
    })

    if (!transaction) {
      return null
    }

    return PrismaTransactionMapper.toDomain(transaction)
  }

  public async create(transaction: Transaction) {
    const data = PrismaTransactionMapper.toPersistence(transaction)

    await this.prisma.transaction.create({
      data,
    })
  }

  public async update(transaction: Transaction) {
    const data = PrismaTransactionMapper.toPersistence(transaction)

    await this.prisma.transaction.update({
      where: { id: transaction.id.toValue() },
      data,
    })
  }

  public async delete(transaction: Transaction) {
    await this.prisma.transaction.delete({
      where: { id: transaction.id.toValue() },
    })
  }
}
