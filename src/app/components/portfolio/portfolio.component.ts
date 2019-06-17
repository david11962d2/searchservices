import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PortafolioService } from '../../servicios/portafolio.service';
import { Valores } from '../../servicios/valores';
import { EditDataService } from '../../servicios/edit-data.service';
import { Reservas } from '../../servicios/reservas';

import { AngularFireAuth } from 'angularfire2/auth';

declare var $: any;
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolio: Valores = {};
  allFotos: any[] = [];
  fotox: any[];
  user: string;
  datosCliente: any = {};
  stringFotoUser: string;
  check: boolean;
  constructor( private activateRoute: ActivatedRoute,
               private _portafolioServices: PortafolioService,
               private eds: EditDataService,
               private aut: AngularFireAuth) {
      this.user = this.aut.auth.currentUser.email;
      this.ver();
    }

    ngOnInit() {

            this.check = false;
            $(document).ready(function() {
              const posicion = $('#top').offset().top;

              $('html, body').animate({
                scrollTop: posicion - 35
              }, 750);
            });
            this.ver();
    }

    private ver() {
      this.activateRoute.params.subscribe( params => {
        this.portfolio = this._portafolioServices.getPortfolio( params['id']) ;
       });
       this.eds.getAllFotos(this.portfolio.ids).subscribe(
         fotos => {
           this.fotox = fotos;
         }
       );
    }

    guardarReservas(datosSer: Valores) {
      console.log(this.user, 'user');
      this.eds.getClientes().subscribe(
        clientes => {
        for (let i = 0 ; i < clientes.length; i++) {
          if (this.user === clientes[i].id) {
              clientes[i].fecha = this.fecha();
              const dcFinal = clientes[i];
              datosSer.fecha = this.fecha();
              console.log(clientes[i]);
              this.eds.addReservas(datosSer, dcFinal);
          }
        }
      });
       this.check = true;
    }

    fecha() {
      const anyo = (new Date).getFullYear();
      const mes = (new Date).getMonth();
      const dia = (new Date).getDate();
      const fecha = dia + '/' + mes + '/' + anyo;
      return fecha;
    }

  }
