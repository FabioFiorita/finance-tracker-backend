import { Either, right } from '@/core/either'
import { Transaction } from '@/domain/enterprise/entities/transaction'

import { TransactionsRepository } from '../repositories/transactions-repository'

interface FetchUserTransactions {
  userId: number
  page: number
}

type FetchUserTransactionsResponse = Either<
  null,
  {
    transactions: Transaction[]
  }
>

export class FetchUserTransactionsUseCase {
  constructor(private repository: TransactionsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserTransactions): Promise<FetchUserTransactionsResponse> {
    const transactions = await this.repository.findManyByUser(userId, page)

    return right({ transactions })
  }
}
