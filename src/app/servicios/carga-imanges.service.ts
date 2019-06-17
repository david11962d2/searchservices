import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { ServiceFoto } from './fotos';
import { FileItem } from '../models/file-item';





@Injectable({
  providedIn: 'root'
})
export class CargaImangesService {
 private CARPETA_IMAGEN = 'img';

  constructor(private db: AngularFirestore) {  }
  nombUrl = new Array ();

  cargarImangesFotos(imagenes: FileItem[]) {
    this.nombUrl = [];
    const _storageRef = firebase.storage();
    const storageRef = _storageRef.ref();

    for ( const item of imagenes ) {

      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }


      const uploadTask: firebase.storage.UploadTask =
                  storageRef.child(`${ this.CARPETA_IMAGEN }/${ item.nombreArchivo }`)
                            .put( item.archivo );

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('Error al subir', error),
        () => {
            console.log('Imagen cargada');
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                item.url = downloadURL;
                item.estaSubiendo = false;
                this.nombUrl.push({nombre: item.nombreArchivo, url: item.url});
              // this.guardarImagen({
              //   nombre: item.nombreArchivo,
              //   url: item.url
              // });
            });
        });
    }
  }

  private guardarImagen(imagen: ServiceFoto ) {
    this.db.collection(`/${this.CARPETA_IMAGEN}`)
    .add(imagen);
  }
}




