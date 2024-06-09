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
      category: {
        id: transaction.category.id.toValue(),
        name: transaction.category.name,
      },
      method: {
        id: transaction.method.id.toValue(),
        name: transaction.method.name,
      },
      user: {
        id: transaction.user.id.toValue(),
        name: transaction.user.name,
      },
    }
  }
}
