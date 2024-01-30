export interface FormValue<T> {
  value: T | undefined | null;
  isValid: boolean | null;
}
