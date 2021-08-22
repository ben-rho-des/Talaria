import bodyParser from 'body-parser';
import chalk from 'chalk';
import express, { Response as ExResponse, Request as ExRequest } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../build/routes';

import sequelizeConnection from './database/database';
import * as http from 'http';
import * as https from 'https';
import { AddressInfo } from 'net';
import { safeGet } from './utils/tools';
import { ErrorResponse, NotFound } from './middleware/error';
import { Application } from 'express-serve-static-core';

const log = console.log;
export const app = express();

const SERVER_PORT = process.env.PORT || 3000;

export const initExpressServer = async (opts: https.ServerOptions): Promise<http.Server> => {
  try {
    try {
      await sequelizeConnection.authenticate();
    } catch (error) {
      throw new Error(error);
    }
    const server: http.Server = await initServer(opts);

    log(chalk.yellow('Server started!'));

    return server;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const initExpressApplication = async (): Promise<Application> => {
  // print env/cfg

  const app: any = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  app.use('/docs', swaggerUi.serve, async (_: ExRequest, res: ExResponse) => {
    return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
  });

  RegisterRoutes(app);

  app.use((_: any, res: any, next: any) => {
    res.header('X-Powered-By', 'stick in that version of talaria from env/cfg');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, Referer, User-Agent');
    res.header('Access-Control-Expose-Headers', 'X-Powered-By, x-correlationid, Access-Control-Allow-Origin');
    next();
  });

  app.use(NotFound);
  app.use(ErrorResponse);

  return app;
};

const initServer = async (opts: https.ServerOptions): Promise<http.Server> => {
  const app = await initExpressApplication();
  const server = http.createServer(opts, app);

  server.listen(SERVER_PORT, () => onListening(server, app));
  server.on('error', (err: any) => onError(err));

  return server;
};

const onListening = (server: http.Server, app: express.Application) => {
  const serverAddress = server.address() as AddressInfo;
  const { port } = serverAddress;

  log(chalk.yellow(`Server listeing on port ${port} : ${serverAddress}`));

  PrintRouteStack(app);
};

const onError = (error: any) => {
  log(chalk.red(error));
};

const PrintRouteStack = (app: express.Application): void => {
  const info = {
    middleware: safeGet(() => app._router.stack, [])
      .map((routeItem: any) => {
        if (routeItem.name === '<anonymous>' && routeItem.name !== 'bound dispatch') {
          return routeItem.name;
        }
        return null;
      })
      .filter(Boolean),
    routes: safeGet(() => app._router.stack, [])
      .map((routeItem: any) => {
        if (routeItem.name === 'bound dispatch') {
          return `${safeGet(() => Object.keys(routeItem.route.methods)[0].toUpperCase())} ${safeGet(() => routeItem.route.path)}`;
        }
        return null;
      })
      .filter(Boolean),
  };

  log(chalk.yellow(info));
};
