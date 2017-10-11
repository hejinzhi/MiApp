import { BossReportLineState } from './../../boss/shared/store';
import * as line from "./../actions/line.action";


const initialState: BossReportLineState[] = [];

export function lineReducer(state = initialState, action: line.LineActions): BossReportLineState[] {
    switch (action.type) {
        case line.LINES_CHECK:
            return action.payload;
        case line.LINES_DELETE:
            return state.filter((s) => s.LINE_ID !== action.payload.LINE_ID)
        case line.LINES_UPDATE:
            return state.map((s) => {
                let update = action.payload
                if(s.LINE_ID === update.LINE_ID){
                    return Object.assign(s,update)
                } else {
                    return s
                }
            })
        default:
            return state;
    }
}