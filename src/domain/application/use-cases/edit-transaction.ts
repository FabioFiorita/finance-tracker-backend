import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Category } from '@/domain/enterprise/entities/category'
import { Method } from '@/domain/enterprise/entities/method'
import { Transaction } from '@/domain/enterprise/entities/transaction'
import { User } from '@/domain/enterprise/entities/user'

import { TransactionsRepository } from '../repositories/transactions-repository'

export type EditTransactionUseCaseRequest = {
  amount: number
  purchaseDate: Date
  paymentDate?: Date
  description: string
  isIncome: boolean
  isRecurring: boolean
  isInstallment: boolean
  initialInstallment?: number
  installmentNumber?: number
  category: Category
  method: Method
  user: User

  transactionId: number
}

type EditTransactionUseCaseResponse = Either<
  ResourceNotFoundError,
  { transaction: Transaction }
>

@Injectable()
export class EditTransactionUseCase {
  constructor(private repository: TransactionsRepository) {}

  async execute(
    request: EditTransactionUseCaseRequest,
  ): Promise<EditTransactionUseCaseResponse> {
    const transaction = await this.repository.findById(request.transactionId)

    if (!transaction) {
      return left(new ResourceNotFoundError())
    }

    const updatedTransaction = Transaction.create(
      {
        amount: request.amount,
        purchaseDate: request.purchaseDate,
        paymentDate: request.paymentDate,
        description: request.description,
        isIncome: request.isIncome,
        isRecurring: request.isRecurring,
        isInstallment: request.isInstallment,
        initialInstallment: request.initialInstallment,
        installmentNumber: request.installmentNumber,
        category: request.category,
        method: request.method,
        user: request.user,
      },
      transaction.id,
    )

    await this.repository.update(updatedTransaction)

    return right({ transaction: updatedTransaction })
  }
}
