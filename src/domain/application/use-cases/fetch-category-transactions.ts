import { Either, right } from '@/core/either'
import { Transaction } from '@/domain/enterprise/entities/transaction'

import { TransactionsRepository } from '../repositories/transactions-repository'

interface FetchCategoryTransactions {
  categoryId: number
  page: number
}

type FetchCategoryTransactionsResponse = Either<
  null,
  {
    transactions: Transaction[]
  }
>

export class FetchCategoryTransactionsUseCase {
  constructor(private repository: TransactionsRepository) {}

  async execute({
    categoryId,
    page,
  }: FetchCategoryTransactions): Promise<FetchCategoryTransactionsResponse> {
    const transactions = await this.repository.findManyByCategory(
      categoryId,
      page,
    )

    return right({ transactions })
  }
}
