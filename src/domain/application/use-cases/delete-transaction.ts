import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { TransactionsRepository } from '../repositories/transactions-repository'

type DeleteTransactionUseCaseRequest = {
  transactionId: number
}

type DeleteTransactionUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteTransactionUseCase {
  constructor(private repository: TransactionsRepository) {}

  async execute({
    transactionId,
  }: DeleteTransactionUseCaseRequest): Promise<DeleteTransactionUseCaseResponse> {
    const transaction = await this.repository.findById(transactionId)

    if (!transaction) {
      return left(new ResourceNotFoundError())
    }

    await this.repository.delete(transaction)
    return right(null)
  }
}
