import { Category } from '@/domain/enterprise/entities/category'

export class CategoryPresenter {
  static toClient(category: Category) {
    return {
      id: category.id,
      name: category.name,
    }
  }
}
