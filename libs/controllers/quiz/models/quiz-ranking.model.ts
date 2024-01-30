class Ranking {
  idProfilDpa: string | null | undefined;
  namaPeserta: string | null | undefined;
  idAccount: string | null | undefined;
  statusPeserta: string | null | undefined;
  statusVerify: string | null | undefined;
  skor: number | null | undefined;
  isMe: boolean | null | undefined;
}

export class Periode {
  prevPeriode: string | null | undefined
  currentPeriode: string | null | undefined
  nextPeriode: string | null | undefined
}
export class QuizRanking {
  periode?: Periode;
  idPeriodeQuiz: string | null | undefined;
  titlePeriode: string | null | undefined;
  astra: Ranking[] | null | undefined;
  nonAstra: Ranking[] | null | undefined;
  skorSaya: Ranking[] | null | undefined;
}
