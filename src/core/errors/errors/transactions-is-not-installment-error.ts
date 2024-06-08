import { UseCaseError } from '@/core/errors/use-case-error'

export class TransactionIsNotInstallmentsError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Transaction is not installment type')
  }
}
