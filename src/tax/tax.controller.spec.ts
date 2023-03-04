import { Test, TestingModule } from '@nestjs/testing'
import { XlsToJson } from '../common/utils/xls-to-json'
import { UploadGuard } from '../common/guards/upload.guard'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTaxDto, TaxDto } from './dto/create-tax.dto'
import { TaxController } from './tax.controller'
import { TaxService } from './tax.service'
import { UpdateTaxDto } from './dto/update-tax.dto'
const expectedTax = {
  taxes: [
    {
      durationId: 'any-value',
      periodStart: 0,
      periodEnd: 0,
      tax: 0
    }
  ]
}

const expectedTaxes = {
  id: 'cd78f446-9d2d-4d14-a45a-597203a1ecbe',
  durationId: '1d57b8c3-8cf5-4e63-b48a-8de9d5d24e9a',
  periodStart: 5,
  periodEnd: 180,
  tax: 1.5
}

const taxDTO: CreateTaxDto = {
  taxes: [
    {
      tax: 1.5,
      periodStart: 5,
      periodEnd: 180,
      durationId: 'any-value'
    }
  ],
  duration: {
    id: 'any-value'
  }
}

const updateTaxDTO: UpdateTaxDto = {
  taxes: [
    {
      tax: 1.5,
      periodStart: 5,
      periodEnd: 180,
      durationId: 'any-value'
    }
  ],
  duration: {
    id: 'any-value'
  }
}
describe('TaxController', () => {
  let controller: TaxController
  let spyService: TaxService
  beforeEach(async () => {
    const apiServiceProvider = {
      provide: TaxService,
      useFactory: () => ({
        parseFileToJson: jest.fn(() => {
          return {
            startTax: '01/12/2000',
            endTax: '30/12/2000',
            taxs: [
              {
                taxa: 1,
                prazominimo: 5,
                prazomaximo: 90
              },
              {
                taxa: 2.5,
                prazominimo: 91,
                prazomaximo: 180
              }
            ]
          }
        }),
        create: jest.fn(() => {
          return { tax: expectedTax }
        }),
        update: jest.fn(() => {
          return { tax: expectedTax }
        }),
        findAll: jest.fn(() => {
          return { data: [expectedTaxes], currentPage: 0, hasNext: true, hasPrevious: true, lastPage: 0 }
        })
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxController],
      providers: [TaxService, PrismaService, apiServiceProvider, XlsToJson]
    }).compile()

    controller = module.get<TaxController>(TaxController)
    spyService = module.get<TaxService>(TaxService)
  })

  it('should create a tax', async () => {
    jest
      .spyOn(spyService, 'create')
      .mockImplementation(async (): Promise<{ taxes: TaxDto[] }> => ({ taxes: expectedTax as unknown as TaxDto[] }))
    const { taxes } = await controller.create(taxDTO)
    expect(taxes).toMatchObject(expectedTax)
  })

  it('should find all taxes', async () => {
    jest
      .spyOn(spyService, 'findAll')
      .mockResolvedValueOnce({ data: [expectedTaxes], currentPage: 0, hasNext: true, hasPrevious: true, lastPage: 0 })
    const result = await controller.findAll()
    expect(result).toMatchObject({
      data: [expectedTaxes],
      currentPage: 0,
      hasNext: true,
      hasPrevious: true,
      lastPage: 0
    })
  })

  it('Controller should call service with correct params', () => {
    const fileMock = {} as Storage.MultipartFile
    const bufferMock = {} as Buffer
    const returnOfService = spyService.parseFileToJson(bufferMock)
    expect(spyService.parseFileToJson).toBeCalledWith(fileMock)
  })
  it('should ensure the UploadGuard is applied to the controller', () => {
    const guards = Reflect.getMetadata('__guards__', TaxController.prototype.uploadFile)
    const guard = new guards[0]()

    expect(guard).toBeInstanceOf(UploadGuard)
  })
})
