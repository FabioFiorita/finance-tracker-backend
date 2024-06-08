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
import { FetchCategoryTransactionsUseCase } from '@/domain/application/use-cases/fetch-category-transactions'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { TransactionPresenter } from '../presenters/transaction-presenter'

const queryValidationPipe = new ZodValidationPipe(pageQuerySchema)

@Controller('categories')
export class FetchCategoryTransactionsController {
  constructor(private readonly useCase: FetchCategoryTransactionsUseCase) {}

  @Get(':id/transactions')
  @UsePipes(queryValidationPipe)
  async handle(
    @Param('id', ParseIntPipe) categoryId: number,
    @Query('page') page: PageQuerySchema,
  ) {
    const result = await this.useCase.execute({ categoryId, page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const transactions = result.value.transactions

    return { transactions: transactions.map(TransactionPresenter.toClient) }
  }
}
