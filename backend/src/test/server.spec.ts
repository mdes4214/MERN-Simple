import { FastifyInstance } from 'fastify'
import { startFastify } from '../server'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as dbHandler from './db'
 
describe('API test', () => {
    let server: FastifyInstance<Server, IncomingMessage, ServerResponse>
 
    beforeAll(async () => {
        await dbHandler.connect()
        server = startFastify(8888)
    })
    
    afterEach(async () => {
        await dbHandler.clearDatabase()
    })
    
    afterAll(async () => {
        try {
            await dbHandler.closeDatabase()
            server.close((): void => { })
            console.log('Closing Fastify server is done!')
        } catch (e) {
            console.log(`Failed to close a Fastify server, reason: ${e}`)
        }
    })
 
    it('should successfully get a pong string', async () => {
        const response = await server.inject({ method: 'GET', url: '/ping' })
 
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual(JSON.stringify({ msg: 'pong' }))
    })

    it('should successfully get a empty list of cats', async () => {
        const response = await server.inject({ method: 'GET', url: '/cats' })
 
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual(JSON.stringify({ cats: [] }))
    })
})