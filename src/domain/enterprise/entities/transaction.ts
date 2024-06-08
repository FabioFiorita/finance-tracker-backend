import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Category } from './category'
import { Method } from './method'
import { User } from './user'

interface TransactionProps {
  amount: number
  purchaseDate: Date
  paymentDate?: Date
  description: string
  isIncome: boolean
  isRecurring: boolean
  isInstallment: boolean
  initialInstallment?: number
  installmentNumber?: number
  category: Category
  method: Method
  user: User
}

export class Transaction extends Entity<TransactionProps> {
  get amount() {
    return this.props.amount
  }

  get purchaseDate() {
    return this.props.purchaseDate
  }

  get paymentDate() {
    return this.props.paymentDate
  }

  get description() {
    return this.props.description
  }

  get isIncome() {
    return this.props.isIncome
  }

  get isRecurring() {
    return this.props.isRecurring
  }

  get isInstallment() {
    return this.props.isInstallment
  }

  get initialInstallment() {
    return this.props.initialInstallment
  }

  get installmentNumber() {
    return this.props.installmentNumber
  }

  get category() {
    return this.props.category
  }

  get method() {
    return this.props.method
  }

  get user() {
    return this.props.user
  }

  public static create(props: TransactionProps, id?: UniqueEntityID) {
    return new Transaction(props, id)
  }
}
