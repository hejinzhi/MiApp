import { BossReportLineState } from './../../boss/shared/store';
import * as lineAll from "./../actions/lineAll.action";

const initialState: BossReportLineState[] = [];

export const lineAllReducer = (state = initialState, action: lineAll.LineAllActions): BossReportLineState[] => {
    switch (action.type) {
        case lineAll.LINES_ALL_SEARCH:
            return action.payload;
        case lineAll.LINES_ALL_UPDATE:
            return state.map((s) => {
                let update = action.payload;
                if(s.LINE_ID === update.LINE_ID){
                    return Object.assign(s,update);
                } else {
                    return s;
                }
            })
        default:
            return state;
    }
}