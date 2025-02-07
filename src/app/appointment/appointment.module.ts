export interface Appointment {
  id?: number;  // L'ID du rendez-vous, optionnel pour la création
  nom_patient: string;
  prenom_patient: string;
  start_time: string;
  days: string[];
  status: string;
}
