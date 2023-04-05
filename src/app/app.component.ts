import { Component } from '@angular/core';
import { authorize } from 'src/spotify/spotify-auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'library-manager-angular';
  isMenuOpen = false;

  onLogin = () => {
    authorize();
  };

  toggleMenu = (state: boolean) => {
    this.isMenuOpen = state;
  };
}
