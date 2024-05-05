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

export interface BookResponse {
  id: number
  nom: string
  prenom: string
  email: string
  nbPersonnes: number
  telephone: string
  prix: number
  dateDebut: string
  dateFin: string
  status: string
  attendees: Attendee[]
}

export interface Attendee {
  prenom: string
  nom: string
}
