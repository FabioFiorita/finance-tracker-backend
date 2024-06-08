import { Transaction } from '@/domain/enterprise/entities/transaction'

export abstract class TransactionsRepository {
  public abstract findManyByUser(
    userId: number,
    page: number,
  ): Promise<Transaction[]>

  public abstract findManyByCategory(
    categoryId: number,
    page: number,
  ): Promise<Transaction[]>

  public abstract findManyByMethod(
    methodId: number,
    page: number,
  ): Promise<Transaction[]>

  public abstract findById(id: number): Promise<Transaction | null>
  public abstract create(transaction: Transaction): Promise<void>
  public abstract update(transaction: Transaction): Promise<void>
  public abstract delete(transaction: Transaction): Promise<void>
}
