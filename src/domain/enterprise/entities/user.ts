import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface UserProps {
  name: string
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  public static create(props: UserProps, id?: UniqueEntityID) {
    return new User(props, id)
  }
}
