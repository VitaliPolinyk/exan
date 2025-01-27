import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardPageComponent } from './pages/board-page/board-page.component';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, BoardPageComponent ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'exan';
}
