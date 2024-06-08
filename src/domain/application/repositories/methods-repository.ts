import { Method } from '@/domain/enterprise/entities/method'

export abstract class MethodsRepository {
  public abstract findAll(): Promise<Method[]>
  public abstract findById(id: number): Promise<Method | null>
}
