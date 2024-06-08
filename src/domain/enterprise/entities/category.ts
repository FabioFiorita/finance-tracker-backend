import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Transaction } from './transaction'

interface CategoryProps {
  createdAt: Date
  name: string
  transactions: Transaction[]
}

export class Category extends Entity<CategoryProps> {
  get createdAt() {
    return this.props.createdAt
  }

  get name() {
    return this.props.name
  }

  get transactions() {
    return this.props.transactions
  }

  public static create(props: CategoryProps, id?: UniqueEntityID) {
    return new Category(props, id)
  }
}
