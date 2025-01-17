import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
 
const mongod = new MongoMemoryServer()
 
/**
 * Connect to mock memory db.
 */
export const connect = async (): Promise<void> => {
    await mongod.start()
    const uri = mongod.getUri()
 
    await mongoose.connect(uri)
}
 
/**
 * Close db connection
 */
export const closeDatabase: () => Promise<void> = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}
 
/**
 * Delete db collections
 */
export const clearDatabase: () => Promise<void> = async () => {
    const collections = mongoose.connection.collections
 
    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany({})
    }
}