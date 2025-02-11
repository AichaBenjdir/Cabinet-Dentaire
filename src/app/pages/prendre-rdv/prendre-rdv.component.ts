import { Component } from '@angular/core';

@Component({
  selector: 'app-prendre-rdv',
  templateUrl: './prendre-rdv.component.html',
  styleUrls: ['./prendre-rdv.component.css']
})
export class PrendreRDVComponent {

  onSubmit() {
   console.log('Formulaire soumis');
    
    document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' });
  }
}
