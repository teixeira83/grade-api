import { requestContext } from '@fastify/request-context';
import { FastifyRequest } from 'fastify';
import {
    fastifyRequestIdHookHandler,
    REQUEST_ID_HEADER_KEY,
} from './fastify-request-id-hook-handler';

jest.mock('@fastify/request-context', () => ({
    requestContext: {
        get: jest.fn(),
        set: jest.fn(),
    },
}));

const mockRequestHeader: FastifyRequest = {
    id: undefined,
    params: undefined,
    raw: undefined,
    body: undefined,
    query: undefined,
    log: undefined,
    req: undefined,
    ip: undefined,
    hostname: undefined,
    url: undefined,
    protocol: undefined,
    method: undefined,
    routerPath: undefined,
    routerMethod: undefined,
    is404: undefined,
    socket: undefined,
    connection: undefined,
    requestContext: {
        get: jest.fn(),
        set: jest.fn(),
    },
    server: undefined,
    context: undefined,
    incomingFile: undefined,
    isMultipart: undefined,
    parts: undefined,
    multipart: undefined,
    files: undefined,
    file: undefined,
    saveRequestFiles: undefined,
    cleanRequestFiles: undefined,
    tmpUploads: undefined,
    headers: {
        [REQUEST_ID_HEADER_KEY]: 'requestId',
    },
};

const mockDone = jest.fn();

describe('fastifyRequestIdHookHandler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be called', () => {
        fastifyRequestIdHookHandler(mockRequestHeader, null, mockDone);

        expect(requestContext.set).toBeCalledTimes(1);
        expect(mockDone).toBeCalledTimes(1);
    });
});
