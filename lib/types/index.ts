// Re-export all types from a single entry point
export * from './workspace.types';
export * from './configuration.types';
export * from './email.types';
export * from './common.types';
export * from './route.types';

// Convenience type aliases
export type { EmailDto as Email } from './email.types';
export type { PaginatedList as PagedResult } from './common.types';
