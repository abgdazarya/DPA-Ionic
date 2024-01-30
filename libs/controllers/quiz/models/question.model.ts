export class Jawaban {
  idQuizAnswer: string | null | undefined;
  jawaban: string | null | undefined;
  gambar: string | null | undefined;
  flagBenar: number | null | undefined;
}

export class QuestionData {
  idQuizQuestion: string | null | undefined;
  pertanyaan: string | null | undefined;
  gambar: string | null | undefined;
  jawaban: Jawaban[] | null | undefined;
}
