import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Category } from '@/domain/enterprise/entities/category'

import { CategoriesRepository } from '../repositories/categories-repository'

type FetchCategoryResponse = Either<
  null,
  {
    categories: Category[]
  }
>

@Injectable()
export class FetchCategoriesUseCase {
  constructor(private repository: CategoriesRepository) {}

  async execute(): Promise<FetchCategoryResponse> {
    const categories = await this.repository.findAll()

    return right({ categories })
  }
}
