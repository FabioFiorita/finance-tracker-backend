import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Method } from '@/domain/enterprise/entities/method'

import { MethodsRepository } from '../repositories/methods-repository'

type FetchMethodResponse = Either<
  null,
  {
    methods: Method[]
  }
>

@Injectable()
export class FetchMethodsUseCase {
  constructor(private repository: MethodsRepository) {}

  async execute(): Promise<FetchMethodResponse> {
    const methods = await this.repository.findAll()

    return right({ methods })
  }
}
