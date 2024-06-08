import { Transaction as PrismaTransaction } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transaction } from '@/domain/enterprise/entities/transaction'

export class PrismaTransactionMapper {
  static toDomain(raw: PrismaTransaction): Transaction {
    if (!raw) {
      throw new Error('Transaction not found')
    }

    if (!raw.categoryId) {
      throw new Error('Category not found')
    }

    if (!raw.methodId) {
      throw new Error('Method not found')
    }

    if (!raw.userId) {
      throw new Error('User not found')
    }

    return Transaction.create(
      {
        createdAt: raw.createdAt,
        description: raw.description,
        amount: raw.amount,
        categoryId: new UniqueEntityID(raw.categoryId),
        isIncome: raw.isIncome,
        isInstallment: raw.isInstallment,
        isRecurring: raw.isRecurring,
        methodId: new UniqueEntityID(raw.methodId),
        purchaseDate: raw.purchaseDate,
        userId: new UniqueEntityID(raw.userId),
        initialInstallment: raw.initialInstallment ?? undefined,
        installmentNumber: raw.installmentNumber ?? undefined,
        paymentDate: raw.paymentDate ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(transaction: Transaction): PrismaTransaction {
    return {
      id: transaction.id.toValue(),
      createdAt: transaction.createdAt,
      description: transaction.description,
      amount: transaction.amount,
      categoryId: transaction.categoryId.toValue(),
      isIncome: transaction.isIncome,
      isInstallment: transaction.isInstallment,
      isRecurring: transaction.isRecurring,
      methodId: transaction.methodId.toValue(),
      purchaseDate: transaction.purchaseDate,
      userId: transaction.userId.toValue(),
      initialInstallment: transaction.initialInstallment ?? null,
      installmentNumber: transaction.installmentNumber ?? null,
      paymentDate: transaction.paymentDate ?? null,
    }
  }
}
