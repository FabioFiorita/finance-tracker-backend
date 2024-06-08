import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Transaction } from './transaction'

interface MethodProps {
  createdAt: Date
  name: string
  userId: UniqueEntityID
  transactions: Transaction[]
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

  get transactions() {
    return this.props.transactions
  }

  public static create(props: MethodProps, id?: UniqueEntityID) {
    return new Method(props, id)
  }
}
