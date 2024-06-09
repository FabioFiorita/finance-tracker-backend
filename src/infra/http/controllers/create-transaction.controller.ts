import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'

import { CreateInstallementTransactionsUseCase } from '@/domain/application/use-cases/create-installement-transaction'
import { CreateTransactionUseCase } from '@/domain/application/use-cases/create-transaction'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  InputTransactionBodySchema,
  inputTransactionBodySchema,
} from '../schemas/input-transaction-body-schema'

const createTransactionBodyValidationPipe = new ZodValidationPipe(
  inputTransactionBodySchema,
)

@Controller('transactions')
export class CreateTransactionController {
  constructor(
    private readonly useCase: CreateTransactionUseCase,
    private readonly installmentUseCase: CreateInstallementTransactionsUseCase,
  ) {}

  @Post()
  @UsePipes(createTransactionBodyValidationPipe)
  async handle(@Body() body: InputTransactionBodySchema) {
    const result = await this.useCase.execute(body)

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const transaction = result.value.transaction

    if (transaction.isInstallment) {
      this.installmentUseCase.execute({ transactionId: transaction.id })
    }
  }
}
