import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  @Output() mouseSobrePag: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

   @HostListener('drop', ['$event'])
   public outDrag(event: any) {
     this._prevenirDetener(event);
     this.mouseSobrePag.emit(false);
   }

   @HostListener('dragover', ['$event'])
   public onDragEnter(event: any) {
      this._prevenirDetener(event);
      this.mouseSobre.emit(true);
   }

   @HostListener('dragleave', ['$event'])
   public onDragLeave(event: any) {
      this.mouseSobre.emit(false);
   }


   @HostListener('drop', ['$event'])
   public onDrop(event: any) {

      const transferencia = this._getTransferencia(event);
      if (!transferencia) {
        return;
      }

      this._extraerArchivos(transferencia.files);
      this._prevenirDetener(event);
      this.mouseSobre.emit(false);
   }
// validaciones
   private _getTransferencia( event: any) {
     return event.dataTransfer ?  event.dataTransfer : event.originalEvent.dataTransfer;
   }

   private _extraerArchivos(archivosLista: FileList) {

      if (this.archivos.length <= 3 ) {
        // tslint:disable-next-line:forin
        for (const propiedad in Object.getOwnPropertyNames( archivosLista )) {
          const archivoTemporal  =  archivosLista[propiedad];
          if (this._archivoPuedeSerCargado(archivoTemporal)) {
            const nuevoArchivo = new FileItem(archivoTemporal);
            this.archivos.push(nuevoArchivo);
          }
        }
      }

   }



   private _archivoPuedeSerCargado( archivo: File): boolean {
     if (!this._archivoFueDropeado( archivo.name) && this._esImangen(archivo.type )) {
        return true;
     } else {
       return false;
     }
   }

   private _prevenirDetener(event) {
     event.preventDefault();
     event.stopPropagation();
   }
   private _archivoFueDropeado(nombreArchivo: string): boolean {
     for (const archivo of this.archivos) {
       if (archivo.nombreArchivo === nombreArchivo) {
         return true;
       }

     }
     return false;
   }

   private _esImangen( tipoArchivo: string): boolean {
     return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
   }
}
