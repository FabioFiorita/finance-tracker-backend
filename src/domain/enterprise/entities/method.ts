import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface MethodProps {
  name: string
  userId: UniqueEntityID
}

export class Method extends Entity<MethodProps> {
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
