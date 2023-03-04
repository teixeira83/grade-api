import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { AppHealthIndicator } from './app.health';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeAll( () =>{
    jest.useFakeTimers('modern').setSystemTime(new Date());
  })
  
  afterAll( () => {
    jest.useRealTimers()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [AppHealthIndicator],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an expected result', async () => {
    const expected = {
      status: 'ok',
      details: {
        app: {
          status: 'up',
        },
      },
      error: {},
      info: {
        app: {
          status: 'up',
        },
      },
    };

    const result = await controller.check();
    expect(result).toEqual(expected);
  });
  it('should return the current datetime and unix time', async () => {
    jest.useFakeTimers('modern').setSystemTime(new Date());
    const result = await controller.checkDate();

    expect(result).toEqual({
      datetime: new Date(),
      unixTime: Date.now()
    });
  });
  
});
