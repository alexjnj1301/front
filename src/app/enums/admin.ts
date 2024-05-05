export enum ReservationsActions {
  ACCEPTED = 'Accepter',
  REJECTED = 'Rejeter',
  CANCELED = 'Annuler'
}

export interface UpdateBookRequest {
  status: string
}
