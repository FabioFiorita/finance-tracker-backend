import { Controller, Get, Param } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Controller('transactions')
export class GetTransactionsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':id')
  async handle(@Param('id') id: number) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId: Number(id),
      },
    })

    return { transactions }
  }
}
