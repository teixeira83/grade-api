export const authJwtSchemaHeaders = {
  type: 'object',
  properties: {
    authorization: {
      type: 'string'
    }
  },
  required: ['authorization']
}
