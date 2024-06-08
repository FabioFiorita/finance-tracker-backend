import { Controller, Get } from '@nestjs/common'

import { PrismaService } from '@/infra/prisma/prisma.service'

@Controller('users')
export class GetUsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async handle() {
    const users = await this.prisma.user.findMany()

    return { users }
  }
}
