import { User } from '@/domain/enterprise/entities/user'

export class UserPresenter {
  static toClient(user: User) {
    return {
      id: user.id.toValue(),
      name: user.name,
    }
  }
}
