import { Module } from '@nestjs/common'

import { FetchCategoryTransactionsUseCase } from '@/domain/application/use-cases/fetch-category-transactions'
import { FetchMethodTransactionsUseCase } from '@/domain/application/use-cases/fetch-method-transactions'
import { FetchUserTransactionsUseCase } from '@/domain/application/use-cases/fetch-user-transactions'
import { FetchUsersUseCase } from '@/domain/application/use-cases/fetch-users'

import { DatabaseModule } from '../database/database.module'
import { FetchCategoryTransactionsController } from './controllers/fetch-category-transactions.controller'
import { FetchMethodTransactionsController } from './controllers/fetch-method-transactions.controller'
import { FetchUserTransactionsController } from './controllers/fetch-user-transactions.controller'
import { FetchUsersController } from './controllers/fetch-users.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    FetchUsersController,
    FetchUserTransactionsController,
    FetchMethodTransactionsController,
    FetchCategoryTransactionsController,
  ],
  providers: [
    FetchUsersUseCase,
    FetchUserTransactionsUseCase,
    FetchMethodTransactionsUseCase,
    FetchCategoryTransactionsUseCase,
  ],
})
export class HttpModule {}
