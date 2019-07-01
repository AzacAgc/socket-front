import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  constructor(
    private socket: Socket
  ) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }// end of checkStatus

  emit( evento: string, payload?: any, callback?: Function ) {
    console.log('Emitiendo evento');

    this.socket.emit( evento, payload, callback );
  }// end of emit

  listen( evento: string ) {
    return this.socket.fromEvent( evento );
  }// end of listen

  loginWS( nombre: string ) {

    return new Promise( (resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, resp => {

        this.usuario = new Usuario( nombre );
        this.guardarStorage();

        resolve();
      });
    });

  }// end of loginWS

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem( 'usuario', JSON.stringify( this.usuario ) );
  }// end of guardarStorage

  cargarStorage() {
    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.loginWS( this.usuario.nombre );
    }
  }// end of cargarStorage

}// end of WebsocketService
