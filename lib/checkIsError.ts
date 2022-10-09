export function checkIsError(obj: unknown): obj is Error {
  return (
    typeof obj === "object" && obj !== null && "data" in obj && "status" in obj
  );
}
