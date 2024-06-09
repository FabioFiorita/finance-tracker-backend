import { Method } from '@/domain/enterprise/entities/method'

export class MethodPresenter {
  static toClient(method: Method) {
    return {
      id: method.id.toValue(),
      name: method.name,
      userId: method.userId.toValue(),
    }
  }
}
