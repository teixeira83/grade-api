import { UpdateDurationTypeCron } from './updateDurationType'

const $connectMock = jest.fn().mockResolvedValue(true)
const PrismaClientMock = jest.fn().mockImplementation(() => {
  return {
    $connect: $connectMock
  }
})


it('should return null when duration not found on update Duration Type', async () => {
    const findManyMock = jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(false)
    const updateManyMock = jest.fn();
    (PrismaClientMock as jest.Mock).mockImplementationOnce(() => {
      return {
        $connect: $connectMock,
        duration: {
          findMany: findManyMock,
          updateMany: updateManyMock,
        },
      }
    })
    const updateDurationTypeCron = new UpdateDurationTypeCron(new PrismaClientMock())
    const result = await updateDurationTypeCron.updateDurationType()
    await expect(result).toBeFalsy();
  })
    it('should return false if both promises fails on update Duration type', async () => {
    const expectedDurationScheduled = {
      id: 'any-value',
      bankId: 'any-value',
      durationStart: new Date('2025-09-24 03:00:00.000'),
      durationType: 'SCHEDULED',
      durationEnd: new Date('2025-09-25 03:00:00.000'),
      updated_at: 'any-value',
      created_at: 'any-value',
      userCreatorId: null,
      userUpdaterId: null
    }
    const expectedDurationActive = {
      id: 'any-value',
      bankId: 'any-value',
      durationStart: new Date('2025-09-24 03:00:00.000'),
      durationType: 'ACTIVE',
      durationEnd: new Date('2025-09-25 03:00:00.000'),
      updated_at: 'any-value',
      created_at: 'any-value',
      userCreatorId: null,
      userUpdaterId: null
    }
    const $connectMock = jest.fn().mockResolvedValue(true)
    const findManyMock = jest.fn().mockReturnValueOnce([expectedDurationScheduled]).mockReturnValueOnce([expectedDurationActive])
    const updateManyMock = jest.fn()
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false)
    const PrismaClientMock = jest.fn().mockImplementation(() => {
      return {
        duration:{
          findMany: findManyMock,
          updateMany: updateManyMock,
        },
        $connect: $connectMock
      }
    })
    const updateDurationTypeCron = new UpdateDurationTypeCron(new PrismaClientMock())
    const result = await updateDurationTypeCron.updateDurationType()
    await expect(result).toBeFalsy();
  })
  it('should return false if al least one promise fails on update Duration type', async () => {
    const expectedDurationScheduled = {
      id: 'any-value',
      bankId: 'any-value',
      durationStart: new Date('2025-09-24 03:00:00.000'),
      durationType: 'SCHEDULED',
      durationEnd: new Date('2025-09-25 03:00:00.000'),
      updated_at: 'any-value',
      created_at: 'any-value',
      userCreatorId: null,
      userUpdaterId: null
    }
    const expectedDurationActive = {
      id: 'any-value',
      bankId: 'any-value',
      durationStart: new Date('2025-09-24 03:00:00.000'),
      durationType: 'ACTIVE',
      durationEnd: new Date('2025-09-25 03:00:00.000'),
      updated_at: 'any-value',
      created_at: 'any-value',
      userCreatorId: null,
      userUpdaterId: null
    }
    const $connectMock = jest.fn().mockResolvedValue(true)
    const findManyMock = jest.fn().mockReturnValueOnce([expectedDurationScheduled]).mockReturnValueOnce([expectedDurationActive])
    const updateManyMock = jest.fn()
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true)
    const PrismaClientMock = jest.fn().mockImplementation(() => {
      return {
        duration:{
          findMany: findManyMock,
          updateMany: updateManyMock,
        },
        $connect: $connectMock
      }
    })
    const updateDurationTypeCron = new UpdateDurationTypeCron(new PrismaClientMock())
    const result = await updateDurationTypeCron.updateDurationType()
    await expect(result).toBeFalsy();
  })
