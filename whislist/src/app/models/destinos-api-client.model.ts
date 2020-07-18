import { DestinoViaje } from './destino-viaje.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { ElegidoFavoritoAction } from './destinos-viajes-state.model';

@Injectable({
  providedIn: 'root'
})

export class DestinoApiClient{

  destinos: DestinoViaje[];
  constructor(private store: Store<AppState>){
    this.destinos = [];
  }

  add(d: DestinoViaje){ this.destinos.push(d); }
  getAll(): DestinoViaje[]{ return this.destinos; }
  getById(id: string): DestinoViaje{ return this.destinos.filter(function(d){return d.nombre.toString() === id;})[0]; }

  elegir(d: DestinoViaje){
    // aqui incovariamos al servidor
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
}
