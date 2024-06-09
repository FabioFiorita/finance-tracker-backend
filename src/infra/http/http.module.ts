import { Module } from '@nestjs/common'

import { CreateInstallementTransactionsUseCase } from '@/domain/application/use-cases/create-installement-transaction'
import { CreateTransactionUseCase } from '@/domain/application/use-cases/create-transaction'
import { DeleteTransactionUseCase } from '@/domain/application/use-cases/delete-transaction'
import { EditTransactionUseCase } from '@/domain/application/use-cases/edit-transaction'
import { FetchCategoryTransactionsUseCase } from '@/domain/application/use-cases/fetch-category-transactions'
import { FetchMethodTransactionsUseCase } from '@/domain/application/use-cases/fetch-method-transactions'
import { FetchUserTransactionsUseCase } from '@/domain/application/use-cases/fetch-user-transactions'
import { FetchUsersUseCase } from '@/domain/application/use-cases/fetch-users'

import { DatabaseModule } from '../database/database.module'
import { CreateTransactionController } from './controllers/create-transaction.controller'
import { DeleteTransactionController } from './controllers/delete-transaction.controller'
import { EditTransactionController } from './controllers/edit.transaction.controller'
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
    EditTransactionController,
    DeleteTransactionController,
    CreateTransactionController,
  ],
  providers: [
    FetchUsersUseCase,
    FetchUserTransactionsUseCase,
    FetchMethodTransactionsUseCase,
    FetchCategoryTransactionsUseCase,
    EditTransactionUseCase,
    DeleteTransactionUseCase,
    CreateTransactionUseCase,
    CreateInstallementTransactionsUseCase,
  ],
})
export class HttpModule {}
