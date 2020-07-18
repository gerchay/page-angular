import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model'
import { DestinoApiClient } from '../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [ DestinoApiClient ]
})

export class ListaDestinosComponent implements OnInit {

  @Output() OnItemAdded: EventEmitter<DestinoViaje>;
  updates:string[]

  constructor(private destinoApi:DestinoApiClient,private store: Store<AppState>) {
    this.OnItemAdded= new EventEmitter();
    this.updates= []
  }

  ngOnInit(): void {
    this.store.select(state => state.destinos.favorito).subscribe(data => {
      const fav = data;
      if(fav!=null){ this.updates.push('Se ha elegido a '+ fav.nombre); }
    });
  }

  destinos():DestinoViaje[] { return this.destinoApi.getAll(); }

  agregado(d: DestinoViaje) {
    this.destinoApi.add(d);
    this.OnItemAdded.emit(d);
  }

  elegido(d: DestinoViaje){
    this.destinoApi.elegir(d);
  }

}
