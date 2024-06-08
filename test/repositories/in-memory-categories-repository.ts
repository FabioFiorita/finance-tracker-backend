import { CategoriesRepository } from '@/domain/application/repositories/categories-repository'
import { Category } from '@/domain/enterprise/entities/category'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  public async findAll() {
    return this.items
  }

  public async findById(id: number) {
    return this.items.find((category) => category.id.toValue() === id) || null
  }
}
