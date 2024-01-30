import { Model } from "@shared"

export class UserRateData {
    idProfilDpa: string | null | undefined
    rating: number | null | undefined
    review: string | null | undefined
}

export class RateData extends Model<RateData>{}