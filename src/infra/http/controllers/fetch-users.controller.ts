import { BadRequestException, Controller, Get } from '@nestjs/common'

import { FetchUsersUseCase } from '@/domain/application/use-cases/fetch-users'

import { UserPresenter } from '../presenters/user-presenter'

@Controller('users')
export class FetchUsersController {
  constructor(private readonly useCase: FetchUsersUseCase) {}

  @Get()
  async handle() {
    const result = await this.useCase.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const users = result.value.users

    return { users: users.map(UserPresenter.toClient) }
  }
}
