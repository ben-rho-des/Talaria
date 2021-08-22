export interface Resolver {
  [key: string]: ResolverItem;
}

export interface ErrorDetails {
  field: string;
  issue: string;
}

export interface ResolverItem {
  id: string;
  message: string;
  status: number;
  correlationId?: string;
  informationLink?: string;
  details?: ErrorDetails;
}
