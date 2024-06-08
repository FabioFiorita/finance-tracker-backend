import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface MethodProps {
  createdAt: Date
  name: string
  userId: UniqueEntityID
}

export class Method extends Entity<MethodProps> {
  get createdAt() {
    return this.props.createdAt
  }

  get name() {
    return this.props.name
  }

  get userId() {
    return this.props.userId
  }

  public static create(props: MethodProps, id?: UniqueEntityID) {
    return new Method(props, id)
  }
}
