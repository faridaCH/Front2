import { Patient } from "./patient"

export class Rdv {
    id ?: number
    dateheure ?: Date
    duree ?: number
    note ?: string
    type ?: string
    patient ?: Patient

}
