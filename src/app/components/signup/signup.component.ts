import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';



declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  datos = {
    email: '',
    password: '',
    inlineRadioOptions: ''
  };

  constructor(public authService: AuthService) {     this.authService.isSinging = true; }

  ngOnInit() {

    $(document).ready(function() {
      const posicion = $('.top').offset().top;

      $('html, body').animate({
        scrollTop: posicion - 300
      }, 1000);

  });
  }

   signup() {
    this.authService.signup(this.datos.email, this.datos.password, this.datos.inlineRadioOptions);
  }

}
