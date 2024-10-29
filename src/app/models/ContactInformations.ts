export interface BookRequest {
  name: string
  firstname: string
  start_date: string
  end_date: string
  nb_person: number
  email: string
  phone: string
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
