import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../servicios/auth.service';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(public authService: AuthService) {
    this.authService.isLogin = true;
  }

  ngOnInit() {

    $(document).ready(function() {
      const posicion = $('.top').offset().top;

      $('html, body').animate({
        scrollTop: posicion - 200
      }, 1000);
  });
  }

  login() {
    this.authService.login(this.email, this.password);
  }

}
