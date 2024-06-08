import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transaction } from '@/domain/enterprise/entities/transaction'

import { TransactionsRepository } from '../repositories/transactions-repository'

type CreateTransactionUseCaseRequest = {
  amount: number
  purchaseDate: Date
  paymentDate?: Date
  description: string
  isIncome: boolean
  isRecurring: boolean
  isInstallment: boolean
  initialInstallment?: number
  installmentNumber?: number
  categoryId: number
  methodId: number
  userId: number
}

type CreateTransactionUseCaseResponse = Either<
  null,
  {
    transaction: Transaction
  }
>

@Injectable()
export class CreateTransactionUseCase {
  constructor(private repository: TransactionsRepository) {}

  async execute({
    amount,
    purchaseDate,
    paymentDate,
    description,
    isIncome,
    isRecurring,
    isInstallment,
    initialInstallment,
    installmentNumber,
    categoryId,
    methodId,
    userId,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = Transaction.create({
      createdAt: new Date(),
      amount,
      purchaseDate,
      paymentDate,
      description,
      isIncome,
      isRecurring,
      isInstallment,
      initialInstallment,
      installmentNumber,
      categoryId: new UniqueEntityID(categoryId),
      methodId: new UniqueEntityID(methodId),
      userId: new UniqueEntityID(userId),
    })

    await this.repository.create(transaction)

    return right({ transaction })
  }
}
