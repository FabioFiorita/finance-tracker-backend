import { Module } from '@nestjs/common'

import { FetchUsersUseCase } from '@/domain/application/use-cases/fetch-users'

import { DatabaseModule } from '../database/database.module'
import { FetchUsersController } from './controllers/fetch-users.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [FetchUsersController],
  providers: [FetchUsersUseCase],
})
export class HttpModule {}
