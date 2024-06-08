import { MethodsRepository } from '@/domain/application/repositories/methods-repository'
import { Method } from '@/domain/enterprise/entities/method'

export class InMemoryMethodsRepository implements MethodsRepository {
  public items: Method[] = []

  public async findAll() {
    return this.items
  }

  public async findById(id: number) {
    return this.items.find((method) => method.id.toValue() === id) || null
  }
}
