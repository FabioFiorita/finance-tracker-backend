import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Transaction } from '@/domain/enterprise/entities/transaction'

import { TransactionsRepository } from '../repositories/transactions-repository'

type EditTransactionUseCaseRequest = {
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

  transactionId: number
}

type EditTransactionUseCaseResponse = Either<
  ResourceNotFoundError,
  { transaction: Transaction }
>

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
        createdAt: transaction.createdAt,
        amount: request.amount,
        purchaseDate: request.purchaseDate,
        paymentDate: request.paymentDate,
        description: request.description,
        isIncome: request.isIncome,
        isRecurring: request.isRecurring,
        isInstallment: request.isInstallment,
        initialInstallment: request.initialInstallment,
        installmentNumber: request.installmentNumber,
        categoryId: new UniqueEntityID(request.categoryId),
        methodId: new UniqueEntityID(request.methodId),
        userId: new UniqueEntityID(request.userId),
      },
      transaction.id,
    )

    await this.repository.update(updatedTransaction)

    return right({ transaction: updatedTransaction })
  }
}
