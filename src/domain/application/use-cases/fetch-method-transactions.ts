import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Transaction } from '@/domain/enterprise/entities/transaction'

import { TransactionsRepository } from '../repositories/transactions-repository'

interface FetchMethodTransactions {
  methodId: number
  page: number
}

type FetchMethodTransactionsResponse = Either<
  null,
  {
    transactions: Transaction[]
  }
>

@Injectable()
export class FetchMethodTransactionsUseCase {
  constructor(private repository: TransactionsRepository) {}

  async execute({
    methodId,
    page,
  }: FetchMethodTransactions): Promise<FetchMethodTransactionsResponse> {
    const transactions = await this.repository.findManyByMethod(methodId, page)

    return right({ transactions })
  }
}
