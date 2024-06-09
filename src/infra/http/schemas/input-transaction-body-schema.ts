import { z } from 'zod'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Category } from '@/domain/enterprise/entities/category'
import { Method } from '@/domain/enterprise/entities/method'
import { User } from '@/domain/enterprise/entities/user'

export const inputTransactionBodySchema = z.object({
  amount: z.number(),
  purchaseDate: z.string().transform((data) => new Date(data)),
  paymentDate: z
    .string()
    .optional()
    .transform((data) => (data ? new Date(data) : undefined)),
  description: z.string(),
  isIncome: z.boolean(),
  isRecurring: z.boolean(),
  isInstallment: z.boolean(),
  initialInstallment: z.number().optional(),
  installmentNumber: z.number().optional(),
  category: z.object({ id: z.number(), name: z.string() }).transform((data) =>
    Category.create(
      {
        name: data.name,
      },
      new UniqueEntityID(data.id),
    ),
  ),
  method: z
    .object({ id: z.number(), name: z.string(), userId: z.number() })
    .transform((data) =>
      Method.create(
        {
          name: data.name,
          userId: new UniqueEntityID(data.userId),
        },
        new UniqueEntityID(data.id),
      ),
    ),
  user: z.object({ id: z.number(), name: z.string() }).transform((data) =>
    User.create(
      {
        name: data.name,
      },
      new UniqueEntityID(data.id),
    ),
  ),
})

export type InputTransactionBodySchema = z.infer<
  typeof inputTransactionBodySchema
>
