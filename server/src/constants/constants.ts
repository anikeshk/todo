export enum ErrorCodes {
  DB_ERROR = 599,
  INVALID_INPUT = 600,
  USERNAME_EXISTS = 601,
}

export const ValidPaths: string[] = ['/health', '/users/register', '/users/login', '/tasks'];
export const PublicPaths: string[] = ['/health', '/users/register'];
