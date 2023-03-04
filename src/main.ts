/* istanbul ignore file */

import { ClassSerializerInterceptor, INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import { FastifyInstance } from 'fastify'
import multipart from '@fastify/multipart'
import { AppModule } from './app.module'
import { HttpExceptionFilter, WinstonLogger } from './common'
import { PROJECT_DESCRIPTION, PROJECT_NAME, PROJECT_VERSION } from './constants'
import AuthMiddleware from './common/middlewares/auth/auth.middleware'
import ClientIdMiddleware from './common/middlewares/clientId.middleware'
import { MdGenerator } from './utils/mdGenerator'

require('newrelic')

/**
 * Default port number.
 */
const DEFAULT_PORT = 3001
/**
 * Default base url endpoint for api.
 */
const DEFAULT_API_PREFIX = '/api'

/**
 * Default api version.
 */
const DEFAULT_API_VERSION = '1'

/**
 * Default url endpoint for Swagger UI.
 */
const DEFAULT_SWAGGER_PREFIX = '/docs'

/**
 * Default markdown file path.
 */
const DEFAULT_MD_FILE_PATH = '../../documents/docs/index.md'

/**
 * Setup the Swagger (UI).
 *
 * @param app
 */

const loggerInstance = new Logger('Bootstrap')
export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(PROJECT_NAME)
    .setDescription(PROJECT_DESCRIPTION)
    .setVersion(PROJECT_VERSION)
    .build()

  const document = SwaggerModule.createDocument(app, options)
  const path = process.env.SWAGGER_PREFIX || DEFAULT_SWAGGER_PREFIX
  SwaggerModule.setup(path, app, document)
}

/**
 * Bootstrap the app.
 */
async function bootstrap() {
  const baseUrl = `${process.env.PREFIX || DEFAULT_API_PREFIX}/v${DEFAULT_API_VERSION}`
  const port = process.env.PORT || DEFAULT_PORT

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ ignoreTrailingSlash: true }),
    { logger: ['error', 'debug', 'log', 'warn', 'verbose'] }
  )

  if (process.env.NODE_ENV !== ('production' || 'build')) {
    new MdGenerator(DEFAULT_MD_FILE_PATH).create('# Programa Facilita - API')
  }

  app.useLogger(app.get(WinstonLogger))
  app.setGlobalPrefix(baseUrl)
  app.enableCors()

  setupSwagger(app)

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const fastifyApp = app.getHttpAdapter().getInstance() as FastifyInstance
  fastifyApp.register(multipart)
  fastifyApp.addHook('preValidation', (req, res, next) => {
    new ClientIdMiddleware().use(req)
    new AuthMiddleware().use(req)

    next()
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get<Reflector>(Reflector), {
      enableImplicitConversion: true
    })
  )
  await app.listen(port, '0.0.0.0')
  loggerInstance.log(`Application is running on: ${await app.getUrl()}${process.env.PREFIX || DEFAULT_API_PREFIX}`)
}

// Start the app
bootstrap().catch((error) => loggerInstance.error(error))
