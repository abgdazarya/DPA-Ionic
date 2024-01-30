export class SaldoDto {
  // noPeserta: string | null | undefined;
  // idAccountDpa?: string | null | undefined;
  token: string | null | undefined;
}

export class MonthlySaldoDto extends SaldoDto {
  month: string | null | undefined;
  year: string | null | undefined;
}
