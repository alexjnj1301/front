export interface BookRequest {
  nom: string
  prenom: string
  dateDebut: string
  dateFin: string
  nbPersonnes: number
  email: string
  telephone: string
  prix: number
  attendees: Attendee[]
}

export interface Attendee {
  prenom: string
  nom: string
}
