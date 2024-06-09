import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CategoryFactory } from 'test/factories/make-category'
import { MethodFactory } from 'test/factories/make-method'
import { TransactionFactory } from 'test/factories/make-transaction'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit Transaction (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let transactionFactory: TransactionFactory
  let categoryFactory: CategoryFactory
  let methodFactory: MethodFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UserFactory,
        TransactionFactory,
        CategoryFactory,
        MethodFactory,
        PrismaService,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)
    transactionFactory = moduleRef.get(TransactionFactory)
    categoryFactory = moduleRef.get(CategoryFactory)
    methodFactory = moduleRef.get(MethodFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[PUT] /transaction/:id', async () => {
    const category = await categoryFactory.makePrismaCategory()
    const user = await userFactory.makePrismaUser()
    const method = await methodFactory.makePrismaMethod({
      userId: user.id,
    })
    const transaction = await transactionFactory.makePrismaTransaction({
      user,
      category,
      method,
    })

    const editTransaction = {
      amount: 300,
      purchaseDate: transaction.purchaseDate,
      description: 'New Description',
      isIncome: false,
      isRecurring: false,
      isInstallment: false,
      category: {
        id: category.id.toValue(),
        name: category.name,
      },
      method: {
        id: method.id.toValue(),
        name: method.name,
        userId: method.userId.toValue(),
      },
      user: {
        id: user.id.toValue(),
        name: user.name,
      },
    }

    const id = transaction.id.toValue()

    const response = await request(app.getHttpServer())
      .put(`/transactions/${id}`)
      .send({
        ...editTransaction,
      })

    const transactionUpdated = await prisma.transaction.findUnique({
      where: { id },
    })

    expect(response.statusCode).toBe(200)
    expect(transactionUpdated).toEqual(
      expect.objectContaining({
        id,
        amount: editTransaction.amount,
        description: editTransaction.description,
      }),
    )
  })
})
