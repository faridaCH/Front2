import Ville from "./ville"


export class Patient {
    id ?: number
    nom ?: string
    prenom ?: string
    dateNaissance ?: Date
    email ?: string 
    telephone ?: string
    adresse ?: string
    ville ?: Ville
}
