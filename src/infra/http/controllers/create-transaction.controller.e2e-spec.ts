import { faker } from '@faker-js/faker'
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

describe('Create Transaction (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
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
    categoryFactory = moduleRef.get(CategoryFactory)
    methodFactory = moduleRef.get(MethodFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /transaction', async () => {
    const category = await categoryFactory.makePrismaCategory()
    const user = await userFactory.makePrismaUser()
    const method = await methodFactory.makePrismaMethod({
      userId: user.id,
    })

    const createTransaction = {
      amount: 300,
      purchaseDate: new Date(),
      description: faker.commerce.productName(),
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

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        ...createTransaction,
      })

    const createdTransaction = await prisma.transaction.findFirst()

    expect(response.statusCode).toBe(201)
    expect(createdTransaction).toEqual(
      expect.objectContaining({
        amount: createTransaction.amount,
        description: createTransaction.description,
      }),
    )
  })
})
