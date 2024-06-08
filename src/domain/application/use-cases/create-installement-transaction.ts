import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { TransactionMissingInstallmentsError } from '@/core/errors/errors/transaction-missing-installments-error'
import { TransactionIsNotInstallmentsError } from '@/core/errors/errors/transactions-is-not-installment-error'
import { Transaction } from '@/domain/enterprise/entities/transaction'

import { TransactionsRepository } from '../repositories/transactions-repository'

type CreateInstallementTransactionUseCaseRequest = {
  transactionId: number
}

type CreateInstallementTransactionsUseCaseResponse = Either<
  | ResourceNotFoundError
  | TransactionIsNotInstallmentsError
  | TransactionMissingInstallmentsError,
  {
    transactions: Transaction[]
  }
>

@Injectable()
export class CreateInstallementTransactionsUseCase {
  constructor(private repository: TransactionsRepository) {}

  async execute({
    transactionId,
  }: CreateInstallementTransactionUseCaseRequest): Promise<CreateInstallementTransactionsUseCaseResponse> {
    const initialTransaction = await this.repository.findById(transactionId)

    if (!initialTransaction) {
      return left(new ResourceNotFoundError())
    }

    if (!initialTransaction.isInstallment) {
      return left(new TransactionIsNotInstallmentsError())
    }

    const { installmentNumber: number, initialInstallment: initial } =
      initialTransaction

    if (!number || !initial) {
      return left(new TransactionMissingInstallmentsError())
    }

    const transactions: Transaction[] = []

    for (let i = initial; i < number; i++) {
      const newTransaction = Transaction.create({
        amount: initialTransaction.amount,
        purchaseDate: dayjs(initialTransaction.purchaseDate)
          .add(i, 'month')
          .toDate(),
        description: initialTransaction.description,
        isIncome: initialTransaction.isIncome,
        isRecurring: initialTransaction.isRecurring,
        isInstallment: true,
        initialInstallment: i + 1,
        installmentNumber: initialTransaction.installmentNumber,
        category: initialTransaction.category,
        method: initialTransaction.method,
        user: initialTransaction.user,
      })

      await this.repository.create(newTransaction)
      transactions.push(newTransaction)
    }

    return right({ transactions })
  }
}
