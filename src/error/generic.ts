import { Resolver } from 'src/types/errors';

const errors: Resolver = {
  INVALID_REQUEST_BODY: {
    id: 'INVALID_REQUEST_BODY',
    message: 'Invalid request',
    status: 400,
  },
  INVALID_REQUEST: {
    id: 'INVALID_REQUEST',
    message: 'Invalid request',
    status: 400,
  },
  UNAUTHORIZED: {
    id: 'UNAUTHORIZED',
    message: "You aren't authorized for this operation",
    status: 401,
  },
};

export default errors;
