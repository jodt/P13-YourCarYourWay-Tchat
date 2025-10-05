import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  pseudo: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  register () {
    if (this.pseudo.trim() !== '') {
      const user =  {
        username : this.pseudo
      } as User;
      this.userService.addUser(user).subscribe(result => {
        this.userService.setUser(result);
        this.router.navigateByUrl('/chat');
      })
    }
  }
}
