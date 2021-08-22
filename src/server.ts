import { initExpressServer } from './app';
import chalk from 'chalk';

const log = console.log;

const startServer = async (): Promise<void> => {
  try {
    await initExpressServer;
  } catch (error) {
    log(chalk.red(error));
    process.exit(1);
  }
};

const handleException = function handleException(error: Error): void {
  log(chalk.red(error));

  process.exit(1);
};

process.on('uncaughtException', handleException);

startServer();
