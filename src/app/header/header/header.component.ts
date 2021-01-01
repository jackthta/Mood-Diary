import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn = false;

  constructor(public auth: AuthService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.auth.isLoggedIn$().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;

      // Manually detect changes to force update template (since it wasn't updating before).
      this.changeDetector.detectChanges();
    });
  }

  onLogOut() {
    this.auth.doLogout();
  }

}
