import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Method } from './method'
import { Transaction } from './transaction'

interface UserProps {
  createdAt: Date
  name: string
  methods: Method[]
  transactions: Transaction[]
}

export class User extends Entity<UserProps> {
  get createdAt() {
    return this.props.createdAt
  }

  get name() {
    return this.props.name
  }

  get methods() {
    return this.props.methods
  }

  get transactions() {
    return this.props.transactions
  }

  public static create(props: UserProps, id?: UniqueEntityID) {
    return new User(props, id)
  }
}
