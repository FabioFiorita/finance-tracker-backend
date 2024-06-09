import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common'

import { EditTransactionUseCase } from '@/domain/application/use-cases/edit-transaction'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  InputTransactionBodySchema,
  inputTransactionBodySchema,
} from '../schemas/input-transaction-body-schema'

const editTransactionBodyValidationPipe = new ZodValidationPipe(
  inputTransactionBodySchema,
)

@Controller('transactions')
export class EditTransactionController {
  constructor(private readonly useCase: EditTransactionUseCase) {}

  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) transactionId: number,
    @Body(editTransactionBodyValidationPipe) body: InputTransactionBodySchema,
  ) {
    const result = await this.useCase.execute({ transactionId, ...body })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
