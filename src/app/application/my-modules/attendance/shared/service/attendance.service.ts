import { Injectable } from '@angular/core';
import { MyHttpService } from '../../../../../core/services/myHttp.service';
@Injectable()
export class AttendanceService {
  constructor(private myHttp: MyHttpService) {  }
}
