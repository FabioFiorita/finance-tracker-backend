import { UseCaseError } from '@/core/errors/use-case-error'

export class TransactionMissingInstallmentsError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Transaction missing installments')
  }
}
