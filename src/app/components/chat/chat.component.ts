import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajeSuscription: Subscription;

  elemento: HTMLElement;

  mensajes: any[] = [];

  constructor(
    private _chatService: ChatService
  ) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes');

    this.mensajeSuscription = this._chatService.getMessages().subscribe(msg => {

      this.mensajes.push( msg );

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });

  }// end of ngOnInit

  ngOnDestroy() {
    this.mensajeSuscription.unsubscribe();
  }

  enviar() {
    if ( this.texto.trim().length === 0 ) {
      return;
    }

    this._chatService.sendMessage( this.texto );

    this.texto = '';
  }// end of enviar

}// end of ChatComponent
