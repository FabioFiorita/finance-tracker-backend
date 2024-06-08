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
import { FetchMethodTransactionsUseCase } from '@/domain/application/use-cases/fetch-method-transactions'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { TransactionPresenter } from '../presenters/transaction-presenter'

const queryValidationPipe = new ZodValidationPipe(pageQuerySchema)

@Controller('methods')
export class FetchMethodTransactionsController {
  constructor(private readonly useCase: FetchMethodTransactionsUseCase) {}

  @Get(':id/transactions')
  @UsePipes(queryValidationPipe)
  async handle(
    @Param('id', ParseIntPipe) methodId: number,
    @Query('page') page: PageQuerySchema,
  ) {
    const result = await this.useCase.execute({ methodId, page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const transactions = result.value.transactions

    return { transactions: transactions.map(TransactionPresenter.toClient) }
  }
}
