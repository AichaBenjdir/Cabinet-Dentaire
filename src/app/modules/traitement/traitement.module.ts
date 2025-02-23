export interface Traitement {
  id?: number; // L'ID est optionnel pour l'ajout
  type: string;
  description: string;
  cout: number;
  duree: number;
}
