import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortafolioService } from '../../servicios/portafolio.service';
import { Router } from '@angular/router';
import { Valores } from '../../servicios/valores';

declare var $: any;

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  portafolio: Valores[] = [];
  termino: string;

  constructor( private activatedRouter: ActivatedRoute ,
               private _portafoliosService: PortafolioService,
               private router: Router) {

    }

    ngOnInit() {

      $(document).ready(function() {
          const posicion = $('.top').offset().top;

          $('html, body').animate({
            scrollTop: posicion - 260
          }, 1000);

      });

      this.activatedRouter.params.subscribe( params => {
        this.termino = params['termino'];
        this.portafolio = this._portafoliosService.buscarServicios(params['termino'], 'texto');
      });
    }

    verPort( idx: number) {

      this.router.navigate( ['/portfolio', idx] );

    }

  }
