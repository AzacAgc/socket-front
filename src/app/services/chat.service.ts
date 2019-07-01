import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) {  }

  sendMessage( mensaje: string ) {
    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }// end of sendMesage

  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }// end of getMessages

  getMessagePrivate() {
    return this.wsService.listen( 'mensaje-privado' );
  }// end of getMessagePrivate

}// end of ChatService
