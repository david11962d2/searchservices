import { Component, OnInit } from '@angular/core';
import { PortafolioService } from '../../servicios/portafolio.service';
import { Router} from '@angular/router';
import { ServiceEmpr } from './../../servicios/service';

import { EditDataService } from '../../servicios/edit-data.service';
import { Valores } from '../../servicios/valores';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  portafolio: Valores[] = [];
  fotos = new Array();
  fotoAddUrl: ServiceEmpr;
  portTemp = new Array();
  ft: Object;

  loading: boolean;
  k = 15;
  ini = 0;



  constructor(private editDat: EditDataService,
              private _portafolioService: PortafolioService ,
              private router: Router) {
    this.loading = true;

  }

  buscarTexto(termino: string) {
    this.router.navigate(['/buscar', termino]);
  }

  ngOnInit() {
          $('.cardProgres').show(1);
          $('.cardProgres').addClass('fadeInUp');

          this.getPortafolio();

  }

  getPortafolio() {
    this.editDat.getServices().subscribe(
      servicios => {
      for (let i = 0 ; i < servicios.length; i++) {
        this.portafolio.push(servicios[i]);
        this.getFotos(servicios[i].ids, i);
      }
    }
  );
    this.loading = false;
    return this.portafolio;
  }
  getFotos(ban: string, i: number) {
      this.editDat.getAllFotos(ban).subscribe(
        fhotos => {
          // this.fotos = fhotos;
          this.portafolio[i].url =  fhotos[0].url;
      }
    );
  }


  // cargarMas() {
  //   const max = this.portafolio.length;
  //   if ( this.ini >= max) {
  //     this.ini = 0;
  //     this.k = 10;
  //   } else  if (this.k + 10 >= max) {
  //     this.ini = this.ini;
  //     this.k = max;
  //   } else {
  //     this.ini = this.k;
  //     this.k = this.k + 10;
  //   }

  //   this.upPantalla();
  // }

  cargarMas() {
    const max = this.portafolio.length;
    if ( this.k + 10 >= max) {
      this.k =  max;
    } else  if (this.k + 10 <= max) {
      this.k += 10;
    }

    this.upPantalla();
  }
  upPantalla() {
    $(document).ready(function() {
      const posicion = $('.down').offset().top;
        $('html, body').animate({
          scrollTop: posicion - (posicion / 5)
        }, 1500);
      });
    }
  }

