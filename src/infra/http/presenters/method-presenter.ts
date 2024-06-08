import { Method } from '@/domain/enterprise/entities/method'

export class MethodPresenter {
  static toClient(method: Method) {
    return {
      id: method.id,
      name: method.name,
    }
  }
}
