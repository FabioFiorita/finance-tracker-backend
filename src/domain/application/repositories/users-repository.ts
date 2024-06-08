import { User } from '@/domain/enterprise/entities/user'

export abstract class UsersRepository {
  public abstract findAll(): Promise<User[]>
  public abstract findById(id: number): Promise<User | null>
}
