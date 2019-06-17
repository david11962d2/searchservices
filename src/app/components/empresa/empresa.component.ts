import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { EditDataService } from '../../servicios/edit-data.service';
import { ClientEmpre } from '../../servicios/clients';



declare var $: any;
@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  cliente: ClientEmpre = {
    key: '90',
    nombreEmpr: '',
    emailEmpr: '',
    mobilEmpr: ''
  };
  constructor(public authService: AuthService, private editDat: EditDataService) {

   }

  ngOnInit() {



    $(document).ready(function() {
      const posicion = $('.top').offset().top;

      $('html, body').animate({
        scrollTop: posicion - 200
      }, 1000);

  });
  }
  guardar() {
    this.editDat.addClient(this.cliente);
  }

  deleteCliente() {

  }

  updateCliente() {

  }

}
