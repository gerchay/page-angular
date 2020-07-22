import { Component, OnInit, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map,filter,debounceTime,distinctUntilChanged,switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { AppConfig, APP_CONFIG } from 'src/app/app.module';

@Component({
  selector: 'app-form-destino',
  templateUrl: './form-destino.component.html',
  styleUrls: ['./form-destino.component.css']
})
export class FormDestinoComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLong=5;
  searchResults: string[]

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.onItemAdded= new EventEmitter();
    this.fg= fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreParametrizable(this.minLong)
      ])],
      url: ['']
    });
    this.fg.valueChanges.subscribe(
      (form: any) => {
        console.log('form cambió:', form);
      }
    );

    this.fg.controls['nombre'].valueChanges.subscribe(
      (value: string) => {
        console.log('nombre cambió:', value);
      }
    );

   }

  ngOnInit(): void {
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
    .pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(120),
      distinctUntilChanged(),
      switchMap((text: string) => ajax(this.config.apiEndpoint + '/ciudades?q=' + text))
    ).subscribe(ajaxResponse => this.searchResults = ajaxResponse.response);
  }

  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): {[s:string]:boolean}{
    let l = control.value.toString().trim().length;
    if(l>0 && l<5){
      return {invalidNombre:true};
    }
    return null;
  }

  nombreParametrizable(minLong:number):ValidatorFn{
    return (control: FormControl): { [s:string]:boolean} | null =>{
      let l = control.value.toString().trim().length;
      if(l>0 && l<minLong){
        return {minLongNombre:true};
      }
      return null;
    }
  }
}
