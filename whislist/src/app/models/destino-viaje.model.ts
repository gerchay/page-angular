import {v4 as uuid} from 'uuid';

export class DestinoViaje{
  private selected: boolean;
  public servicios: string[];
  id = uuid();
  public votes = 0;

  constructor(public nombre:string,public url:string){ this.servicios=["pileta","desayuno"]; }

  isSelected():boolean{ return this.selected; }
  setSelected(s:boolean):void { this.selected=s; }
  voteUp(): any { this.votes++; }
  voteDown(): any { this.votes--; }
}
