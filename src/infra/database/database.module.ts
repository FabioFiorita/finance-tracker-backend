import { Module } from '@nestjs/common'

import { CategoriesRepository } from '@/domain/application/repositories/categories-repository'
import { MethodsRepository } from '@/domain/application/repositories/methods-repository'
import { TransactionsRepository } from '@/domain/application/repositories/transactions-repository'
import { UsersRepository } from '@/domain/application/repositories/users-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categories-repository'
import { PrismaMethodsRepository } from './prisma/repositories/prisma-methods-repository'
import { PrismaTransactionsRepository } from './prisma/repositories/prisma-transactions-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: MethodsRepository,
      useClass: PrismaMethodsRepository,
    },
    {
      provide: TransactionsRepository,
      useClass: PrismaTransactionsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [
    PrismaService,
    CategoriesRepository,
    UsersRepository,
    MethodsRepository,
    TransactionsRepository,
  ],
})
export class DatabaseModule {}
