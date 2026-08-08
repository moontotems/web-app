/**
 * Console logger utility.
 */
export class Logger {
  async info(message: string): Promise<void> {
    console.info('LOG:', message)
  }

  async warn(message: string): Promise<void> {
    console.warn('LOG: WARNING:', message)
  }

  async error(message: string): Promise<void> {
    console.error('LOG: ERROR:', message)
  }
}

export const logger = new Logger()
