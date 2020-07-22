import { Component, OnInit } from '@angular/core';
import { DestinoApiClient } from './../../models/destinos-api-client.model';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [DestinoApiClient]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;
  style = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }]
  };

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinoApiClient) {

   }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }



}
