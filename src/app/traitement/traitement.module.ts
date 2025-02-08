export interface Traitement {
  id?: number;
  patientId: number;
  type: string;
  duration: number;
  cost: number;
  status: 'en cours' | 'terminé' | 'suivi nécessaire';
  followUpDate: Date | null; 
  
}
