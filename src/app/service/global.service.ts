import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private store: Store<any>) { }

  getAllState() {
    return this.store.select('appReducer');
  }

  updateCurrentIdInState(obj: { action: any; payload: any; }) {
    this.store.dispatch({
      type: obj.action,
      payload: obj.payload
    })
  }
}
