import { TransactionsRepository } from '@/domain/application/repositories/transactions-repository'
import { Transaction } from '@/domain/enterprise/entities/transaction'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  public async findManyByUser(userId: number, page: number) {
    return this.items
      .filter((transaction) => transaction.user.id.toValue() === userId)
      .slice((page - 1) * 20, page * 20)
  }

  public async findManyByCategory(categoryId: number, page: number) {
    return this.items
      .filter((transaction) => transaction.category.id.toValue() === categoryId)
      .slice((page - 1) * 20, page * 20)
  }

  public async findManyByMethod(methodId: number, page: number) {
    return this.items
      .filter((transaction) => transaction.method.id.toValue() === methodId)
      .slice((page - 1) * 20, page * 20)
  }

  public async findById(id: number) {
    return (
      this.items.find((transaction) => transaction.id.toValue() === id) || null
    )
  }

  public async create(transaction: Transaction) {
    this.items.push(transaction)
  }

  public async update(transaction: Transaction) {
    const index = this.items.findIndex(
      (item) => item.id.toValue() === transaction.id.toValue(),
    )
    this.items[index] = transaction
  }

  public async delete(transaction: Transaction) {
    const index = this.items.findIndex(
      (item) => item.id.toValue() === transaction.id.toValue(),
    )
    this.items.splice(index, 1)
  }
}
