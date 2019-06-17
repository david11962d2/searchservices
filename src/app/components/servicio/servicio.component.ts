import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { EditDataService } from '../../servicios/edit-data.service';
import { ServiceEmpr } from '../../servicios/service';
import { FileItem } from '../../models/file-item';
import { CargaImangesService } from '../../servicios/carga-imanges.service';
import { ServiceFoto } from '../../servicios/fotos';
declare var $: any;
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  tipoClient: string;

  servicio: ServiceEmpr = {
    key: '89',
    email: '',
    telefono: '',
    empresa: '',
    tipo: '',
    ubicacion: '',
    descripcion: '',
    precio: '',
    tipoCliente: '',

  };

  item: any;
  fot: ServiceFoto[];


  estaSobrePagina = false;
  estaSobreElemento = false;
  archivos: FileItem[] = [];

  bandera = true;

  constructor(public authService: AuthService, private editDat: EditDataService,
              public _cargaImagenes: CargaImangesService) { }

  ngOnInit() {

    $(document).ready(function() {
      const posicion = $('.top').offset().top;

      $('html, body').animate({
        scrollTop: posicion - 260
      }, 1000);

  });
  }

  guardar() {
    // this.fot = this._cargaImagenes.nombUrl;
    // this.item = this.fot.nombre;
    this.editDat.addServicio(this.servicio, this._cargaImagenes.nombUrl);
  }

  deleteCliente() {

  }

  updateCliente() {

  }

  cargarImagenes(control: boolean) {
    this._cargaImagenes.cargarImangesFotos(this.archivos);
    this.bandera = control;
  }

  limpiarArchivos() {
    this.archivos = [];
  }
}
