import {
  Category as PrismaCategory,
  Method as PrismaMethod,
  Prisma,
  Transaction as PrismaTransaction,
  User as PrismaUser,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transaction } from '@/domain/enterprise/entities/transaction'

import { PrismaCategoryMapper } from './prisma-category-mapper'
import { PrismaMethodMapper } from './prisma-method-mapper'
import { PrismaUserMapper } from './prisma-user-mapper'

type PrismaTransactionWithCategoryAndMethodAndUser = PrismaTransaction & {
  category: PrismaCategory | null
  method: PrismaMethod | null
  user: PrismaUser | null
}

export class PrismaTransactionMapper {
  static toDomain(
    raw: PrismaTransactionWithCategoryAndMethodAndUser,
  ): Transaction {
    if (!raw) {
      throw new Error('Transaction not found')
    }

    if (!raw.category) {
      throw new Error('Category not found')
    }

    if (!raw.method) {
      throw new Error('Method not found')
    }

    if (!raw.user) {
      throw new Error('User not found')
    }

    return Transaction.create(
      {
        description: raw.description,
        amount: raw.amount,
        category: PrismaCategoryMapper.toDomain(raw.category),
        isIncome: raw.isIncome,
        isInstallment: raw.isInstallment,
        isRecurring: raw.isRecurring,
        method: PrismaMethodMapper.toDomain(raw.method),
        purchaseDate: raw.purchaseDate,
        user: PrismaUserMapper.toDomain(raw.user),
        initialInstallment: raw.initialInstallment ?? undefined,
        installmentNumber: raw.installmentNumber ?? undefined,
        paymentDate: raw.paymentDate ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(
    transaction: Transaction,
  ): Prisma.TransactionUncheckedCreateInput {
    return {
      id: transaction.id.toValue(),
      description: transaction.description,
      amount: transaction.amount,
      categoryId: transaction.category.id.toValue(),
      isIncome: transaction.isIncome,
      isInstallment: transaction.isInstallment,
      isRecurring: transaction.isRecurring,
      methodId: transaction.method.id.toValue(),
      purchaseDate: transaction.purchaseDate,
      userId: transaction.user.id.toValue(),
      initialInstallment: transaction.initialInstallment ?? null,
      installmentNumber: transaction.installmentNumber ?? null,
      paymentDate: transaction.paymentDate ?? null,
    }
  }
}
