import chalk from 'chalk';
import { Request, Response } from 'express';
import Resolver from '../error/generic';
import { NextFunction } from 'express-serve-static-core';

const DefaultErrorID = 'SERVER_FAILURE';
const DefaultErrorMessage = 'Unknown Error Occurerd';
const DefaultStatus = 500;

const log = console.log;
const ORANGE = '#FFA500';

export const NotFound = (_: Request, res: Response) => {
  log(chalk.hex(ORANGE)`404 Response`);

  return res.status(404).send();
};

export const ErrorResponse = (err: any, _: Request, res: Response, __: NextFunction) => {
  let displayErrorCode: string | null = null;
  let displayErrorId: string = DefaultErrorID;
  let displayStatus: number = DefaultStatus;
  let displayErrorMessage: string = DefaultErrorMessage;
  let displayInformationLink: string;
  let displayErrorDetails: string;
  let innerError: Error;

  const errorObj: any = {
    errorId: displayErrorId,
    message: displayErrorMessage,
  };

  // const correlationId = safeGet(()=> res.locals.correlationId);

  if (!err.isHandledError) {
    if (err instanceof SyntaxError) {
      displayStatus = Resolver.INVALID_REQUEST_BODY.status;
      displayErrorId = Resolver.INVALID_REQUEST_BODY.id;
      displayErrorMessage = Resolver.INVALID_REQUEST_BODY.message;
    }

    if (err.message && err.stack) {
      log(chalk.hex(ORANGE)`${err.message} ${displayStatus} ${displayErrorId} ${displayErrorMessage}`);
    } else {
      log(chalk.hex(ORANGE)`Handling error with no message or no stack ${displayStatus} ${displayErrorId} ${displayErrorMessage}`);
    }
  } else {
    try {
      const resErr = err.resolveError();

      displayErrorCode = resErr.code;
      displayErrorId = resErr.resolvedErr.id;
      displayStatus = resErr.resolvedErr.status;
      displayErrorMessage = resErr.resolvedErr.message;
      displayInformationLink = resErr.resolvedErr.informationLink;
      displayErrorDetails = resErr.resolvedErr.details;
      innerError = resErr.nativeError;

      if (displayErrorCode !== null) errorObj.code = displayErrorCode;
      if (displayInformationLink !== null) errorObj.informationLink = displayInformationLink;
      if (displayErrorDetails !== null) errorObj.details = displayErrorDetails;
    } catch (mapErr) {
      displayErrorId = err.id;
      displayErrorMessage = err.message;
      displayErrorDetails = err.details;
      displayErrorCode = err.code;
      innerError = err.native;

      if (err.status) {
        displayStatus = err.status;
      }

      console.trace();

      log(chalk.hex(ORANGE)`Could not map error ${innerError}`);

      if (displayErrorCode !== null) errorObj.code = displayErrorCode;
      if (displayErrorDetails !== null) errorObj.details = displayErrorDetails;
    }
  }

  log(chalk.hex(ORANGE)`404 Response`);

  return res.status(displayStatus || 500).json(errorObj);
};
