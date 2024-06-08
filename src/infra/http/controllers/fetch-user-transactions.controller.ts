import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
} from '@nestjs/common'

import { PageQuerySchema, pageQuerySchema } from '@/core/page-query-schema'
import { FetchUserTransactionsUseCase } from '@/domain/application/use-cases/fetch-user-transactions'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { TransactionPresenter } from '../presenters/transaction-presenter'

const queryValidationPipe = new ZodValidationPipe(pageQuerySchema)

@Controller('users')
export class FetchUserTransactionsController {
  constructor(private readonly useCase: FetchUserTransactionsUseCase) {}

  @Get(':id/transactions')
  @UsePipes(queryValidationPipe)
  async handle(
    @Param('id', ParseIntPipe) userId: number,
    @Query('page') page: PageQuerySchema,
  ) {
    const result = await this.useCase.execute({ userId, page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const transactions = result.value.transactions

    return { transactions: transactions.map(TransactionPresenter.toClient) }
  }
}
