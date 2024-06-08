import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  public async findAll() {
    return this.items
  }

  public async findById(id: number) {
    return this.items.find((user) => user.id.toValue() === id) || null
  }
}
