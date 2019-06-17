import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';
import { Usuarios } from '../../../servicios/usuario';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email: string;
  password: string;
  inlineRadioOptions: string;
  cliente: Usuarios;


  constructor( private router: Router, public authService: AuthService ) {
    this.logout();
  }

  ngOnInit() {

    $(document).ready(function() {
      $(window).scroll(function() {
        const scroll = $(window).scrollTop();
        if (scroll > 100) {
          $('.black')
          .css('background' ,
               'linear-gradient(45deg, rgba(51,156,255,1) 0%, rgba(51,156,255,1) 32%, rgba(153,218,255,1) 53%, rgba(153,218,255,1) 100%)')
          .css('height', 65);
        } else {
          $('.black').css('background' , 'transparent').css('height', 55);
        }
      });
    });
        this.authService.cliente[0].key = '0';
  }

  logout() {
    this.authService.logout();
  }
}
