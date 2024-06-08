import { Category } from '@/domain/enterprise/entities/category'

export abstract class CategoriesRepository {
  public abstract findAll(): Promise<Category[]>
  public abstract findById(id: number): Promise<Category | null>
}
