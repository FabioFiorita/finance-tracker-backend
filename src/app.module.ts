import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { GetUsersController } from './controllers/get-users.controller'
import { envSchema } from './env'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [GetUsersController],
  providers: [PrismaService],
})
export class AppModule {}
