export type QueryResponse<T = undefined> =
  | {
      data: T | null;
      error: null;
    }
  | {
      data: null;
      error: unknown;
    };
