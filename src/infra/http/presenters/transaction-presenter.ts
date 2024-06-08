import { Transaction } from '@/domain/enterprise/entities/transaction'

export class TransactionPresenter {
  static toClient(transaction: Transaction) {
    return {
      id: transaction.id,
      description: transaction.description,
      amount: transaction.amount,
      purchaseDate: transaction.purchaseDate,
      paymentDate: transaction.paymentDate,
      isIncome: transaction.isIncome,
      isRecurring: transaction.isRecurring,
      isInstallment: transaction.isInstallment,
      initialInstallment: transaction.initialInstallment,
      installmentNumber: transaction.installmentNumber,
      categoryId: transaction.categoryId,
      methodId: transaction.methodId,
      userId: transaction.userId,
    }
  }
}
