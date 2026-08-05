import { logger } from './utils/logger'

async function startServer() {
  console.log('Starting server...')

  try {
    await logger.info('Server started')
    console.log('Hello world')
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

startServer()
