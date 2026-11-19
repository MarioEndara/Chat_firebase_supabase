import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true, // <-- ESTO FALTABA
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}