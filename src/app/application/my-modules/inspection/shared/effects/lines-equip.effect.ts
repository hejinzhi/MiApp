import { BossReportLineState } from './../../boss/shared/store';
import { Lines_Equip_Check, LINES_EQUIP_CHECK } from './../actions/lines-equip.action';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store} from '@ngrx/store';
import { Observable } from 'rxjs';


@Injectable()
export class LinesEquipEffects {
  constructor(private store$: Store<any>,private actions$: Actions) {}
//   @Effect()
//   search$: Observable<Observable<Action>> = this.actions$
//     .ofType(LINES_EQUIP_CHECK)
//     .map(query => toPayload(query)).map((list:BossReportLineState[]) => {
//         list['LOCATION'] = '456';
//         console.log(list);
//         return Observable.of(new Lines_Equip_Check(list))
//     });
}