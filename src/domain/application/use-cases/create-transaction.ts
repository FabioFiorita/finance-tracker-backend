import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Category } from '@/domain/enterprise/entities/category'
import { Method } from '@/domain/enterprise/entities/method'
import { Transaction } from '@/domain/enterprise/entities/transaction'
import { User } from '@/domain/enterprise/entities/user'

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
  category: Category
  method: Method
  user: User
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
    category,
    method,
    user,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = Transaction.create({
      amount,
      purchaseDate,
      paymentDate,
      description,
      isIncome,
      isRecurring,
      isInstallment,
      initialInstallment,
      installmentNumber,
      category,
      method,
      user,
    })

    await this.repository.create(transaction)

    return right({ transaction })
  }
}
