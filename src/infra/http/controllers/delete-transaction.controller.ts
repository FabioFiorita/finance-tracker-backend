import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common'

import { DeleteTransactionUseCase } from '@/domain/application/use-cases/delete-transaction'

@Controller('transactions')
export class DeleteTransactionController {
  constructor(private readonly useCase: DeleteTransactionUseCase) {}

  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) transactionId: number) {
    const result = await this.useCase.execute({ transactionId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
