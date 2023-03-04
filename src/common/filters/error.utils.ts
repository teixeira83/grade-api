import { ValidationError } from 'class-validator'
import { isEmpty, snakeCase, toUpper } from 'lodash'

/**
 * Exception response.
 */
interface ExceptionResponse {
  error?: string
  message?: string | string[] | ValidationError[]
}

/**
 * Constraints of the validation.
 */
interface Constraint {
  [type: string]: string
}

/**
 * Format a string to uppercase and snakeCase.
 *
 * @param error - string
 * @returns - ex `Bad Request` become `BAD_REQUEST`
 */
function formatErrorCode(error: string): string {
  return toUpper(snakeCase(error))
}

function findConstraints(error: ValidationError): Constraint | undefined {
  let objectToIterate: ValidationError = error
  while (!isEmpty(objectToIterate.children)) {
    ;[objectToIterate] = objectToIterate.children
  }

  return objectToIterate.constraints
}
/**
 * Aggregation of error messages for a given ValidationError
 * @param error
 */
function parseErrorMessage(error: ValidationError): string {
  let message = ''
  const messages: Constraint | undefined = findConstraints(error)

  if (messages === undefined) {
    return 'Invalid parameter'
  }

  Object.keys(messages).forEach((key: string): void => {
    message += `${message === '' ? '' : ' -- '}${messages[key]}`
  })

  return message
}

/**
 *
 * Extract the stringified error code
 *
 * @param exception - exception response
 * @returns - string that describes the error
 */
export function getErrorCode(exception: ExceptionResponse | string): string {
  if (typeof exception === 'string') {
    return formatErrorCode(exception)
  }

  if ('error' in exception && typeof exception.error === 'string') {
    return formatErrorCode(exception.error)
  }

  return ''
}

/**
 * Extract the error messages.
 *
 * @param exception
 */
export function getErrorMessage(exception: ExceptionResponse | string): string {
  if (typeof exception === 'string') {
    return exception
  }

  if (typeof exception.message === 'string') {
    return exception.message
  }

  if (Array.isArray(exception.message)) {
    // process the first error message
    const error: ValidationError | string = exception.message[0]
    if (typeof error === 'string') {
      return error
    }
    const validationError: string = parseErrorMessage(error)
    if (validationError) {
      return validationError
    }
  }

  return 'INTERNAL_SERVER_ERROR'
}

/**
 * Find constraints in an error object.
 *
 * @param error
 */
