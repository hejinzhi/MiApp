import { BossReportLineState } from './../../boss/shared/store';
import * as lineAll from "./../actions/lines-all-equip.action";

const initialState: BossReportLineState[] = [];

export function linesAllEquipReducer (state = initialState, action: lineAll.LineAllEquipActions): BossReportLineState[] {
    switch (action.type) {
        case lineAll.LINES_ALL_EQUIP_SEARCH:
            return action.payload;
        case lineAll.LINES_ALL_EQUIP_UPDATE:
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