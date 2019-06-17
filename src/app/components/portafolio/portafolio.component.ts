import { Component, OnInit } from '@angular/core';
import { PortafolioService } from '../../servicios/portafolio.service';
import { Router } from '@angular/router';
import { ServiceEmpr } from '../../servicios/service';


import { EditDataService } from '../../servicios/edit-data.service';
import { Valores } from '../../servicios/valores';
import { NgForm, FormsModule } from '@angular/forms';





declare var $: any;

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {

  portafolio: Valores[] = [];
  fotos = new Array();
  fotoAddUrl: ServiceEmpr;
  portTemp = new Array();
  ft: Object;

  k = 10;
  ini = 0;

  portUbicacion: Valores[] = [];
  portTipo: Valores[] = [];
  ides: string[] = [];


  constructor(private editDat: EditDataService, private _portafolioService: PortafolioService,
    private router: Router) {
      console.log('pasa por el constructor');
    }

    ngOnInit() {
      console.log('pasa por OnInit');
      $(document).ready(function() {
          const posicion = $('.top').offset().top;

          $('html, body').animate({
            scrollTop: posicion - 300
          }, 1000);

      });

      this.getPortafolio();
    }

    verPort( idx: number) {
      this.router.navigate( ['/portfolio', idx] );
    }


    getPortafolio() {
      this.editDat.getServices().subscribe(
        servicios => {
        for (let i = 0 ; i < servicios.length; i++) {
          this.portafolio.push(servicios[i]);
          this.getFotos(servicios[i].ids, i);
          this.portUbicacion.push(servicios[i].ubicacion);
          this.portTipo.push(servicios[i].tipo);
          this.getIds(servicios[i].ids);
        }
      }
    );
      console.log(this.portafolio, 'portafolio');
      return this.portafolio;
    }

    getIds(isd: string) {
      this.ides.push(isd);
    }

    getFotos(ban: string, i: number) {
        this.editDat.getAllFotos(ban).subscribe(
          fhotos => {
            // this.fotos = fhotos;
            this.portafolio[i].url =  fhotos[0].url;
        }
      );
    }

    buscarTexto(termino: string, sa: string) {
      this.portafolio = [];
      this.portafolio = this._portafolioService.buscarServicios(termino, sa );

    }

    // buscarUbicacion(text: string) {
    //   this.portafolio = [];
    //   this.portafolio = this._portafolioService.bucarUbicacion(text);
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
