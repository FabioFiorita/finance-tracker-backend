import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { User } from '@/domain/enterprise/entities/user'

import { UsersRepository } from '../repositories/users-repository'

type FetchUserResponse = Either<
  null,
  {
    users: User[]
  }
>

@Injectable()
export class FetchUsersUseCase {
  constructor(private repository: UsersRepository) {}

  async execute(): Promise<FetchUserResponse> {
    const users = await this.repository.findAll()

    return right({ users })
  }
}
