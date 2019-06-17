import { Injectable } from '@angular/core';
import { EditDataService } from '../servicios/edit-data.service';
import { ServiceEmpr } from '../servicios/service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Valores } from '../servicios/valores';


export interface Item { nombre: string; url: string; }

@Injectable()
export class PortafolioService {

  private portafolios: Valores[] = [];
  private portBus: Valores[] = [];
  private clients = {};
  private posicion = 0;

  constructor(private editDat: EditDataService, private auts: AngularFireAuth,
    private router: Router, private afs: AngularFirestore) {

      this.editDat.getServices().subscribe(
        servicios => {
        for (let i = 0 ; i < servicios.length; i++) {
            this.portafolios.push(servicios[i]);
            this.getFotos(servicios[i].ids, i);
        }
      }
    );
  }

  // getPortafolio() {
  //   this.portafolios  = [];
  //   this.editDat.getServices().subscribe(
  //     servicios => {
  //     for (let i = 0 ; i < servicios.length; i++) {
  //         this.portafolios.push(servicios[i]);
  //     }
  //   }
  // );
  //   return this.portafolios;
  // }

  getFotos(ban: string, i: number) {
    this.editDat.getAllFotos(ban).subscribe(
      fhotos => {
        // this.fotos = fhotos;
        this.portafolios[i].url =  fhotos[0].url;
    }
  );
}
  getPortfolio(idx: number) {
    return this.portafolios[idx];
  }

  // bucarUbicacion(text: string) {
  //   const textosArr: Valores[] = [];
  //   for ( let i  = 0 ; i < this.portafolios.length; i ++) {
  //       if ( this.portafolios[i].ubicacion === text) {
  //         textosArr.push(this.portafolios[i]);
  //       }
  //   }
  //   return textosArr;
  // }

  buscarServicios(termino: string, bandera: string) {
    this.posicion = 0;
    const textosArr: Valores[] = [];
    if (bandera === 'texto') {
      termino = termino.toLowerCase();
        for (let i = 0 ; i < this.portafolios.length; i++) {
          const portBus = this.portafolios[i];
          const descripcion = portBus.descripcion.toLowerCase();
          if ( descripcion.indexOf(termino) >= 0 ) {
            textosArr.push(portBus);
            textosArr[this.posicion].pos = i;
            this.posicion = this.posicion + 1;
          }
      }
    } else if (bandera === 'ubicacion') {
        for ( let i  = 0 ; i < this.portafolios.length; i ++) {
          if ( this.portafolios[i].ubicacion === termino) {
            textosArr.push(this.portafolios[i]);
            textosArr[this.posicion].pos = i;
            this.posicion = this.posicion + 1;
          }
      }
    } else if (bandera === 'actividad') {
        for ( let i  = 0 ; i < this.portafolios.length; i ++) {
          if ( this.portafolios[i].tipo === termino) {
            textosArr.push(this.portafolios[i]);
            textosArr[this.posicion].pos = i;
            this.posicion = this.posicion + 1;
          }
      }
    }
    return textosArr;
  }

}

