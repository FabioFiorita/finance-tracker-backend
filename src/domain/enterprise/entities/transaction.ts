import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface TransactionProps {
  createdAt: Date
  amount: number
  purchaseDate: Date
  paymentDate?: Date
  description: string
  isIncome: boolean
  isRecurring: boolean
  isInstallment: boolean
  initialInstallment?: number
  installmentNumber?: number
  categoryId: UniqueEntityID
  methodId: UniqueEntityID
  userId: UniqueEntityID
}

export class Transaction extends Entity<TransactionProps> {
  get createdAt() {
    return this.props.createdAt
  }

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

  get categoryId() {
    return this.props.categoryId
  }

  get methodId() {
    return this.props.methodId
  }

  get userId() {
    return this.props.userId
  }

  public static create(props: TransactionProps, id?: UniqueEntityID) {
    return new Transaction(props, id)
  }
}
