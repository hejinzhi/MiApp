import { TranslateService } from '@ngx-translate/core';
import { InspectionService } from './../shared/service/inspection.service';
import { CommonService } from './../../../../../core/services/common.service';
import { StationModel } from './../grid/grid.component';
import { NavController, NavParams, DomController, IonicPage } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Mode } from "../grid/grid.component";

@IonicPage()
@Component({
    selector: 'sg-stations',
    templateUrl: 'stations.component.html'
})
export class StationsComponent implements OnInit {
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private commonService: CommonService,
        private inspectionService: InspectionService,
        private translate: TranslateService
    ) { }

    mode: number = Mode.STATION;
    stations: StationModel[] = [];
    translateTexts: any = {
        'inspection.ipqa.prompt': '',
        'inspection.ipqa.noNetwork': '',
    }; // 记录转换后的文本(简繁体)


    // 用户选择的线别
    lineName: string;
    lineId: number;

    localStorageStationName: string;// 记录站点的本地存储名称

    async ngOnInit() {
        this.translateTexts = await this.translate.get(['inspection.ipqa.prompt', 'inspection.ipqa.noNetwork']).toPromise();
        this.init();
    }

    init() {
        this.stations = [];
        let params: any[] = this.navParams.get('stations');
        this.lineName = this.navParams.get('lineName');
        this.lineId = this.navParams.get('lineId');
        let temp: any[] = params.filter((v) => {
            return v.showCheckbox === true;
        });
        temp.forEach((v) => {
            this.stations.push({
                title: v.title,
                showCheckbox: false,
                stationID: v.STATION_ID,
                headerId: 0,
                status: ''
            });
        });
        this.localStorageStationName = this.inspectionService.getLocalStorageStationName(this.lineId);
        let localData: StationModel[] = this.getItem(this.localStorageStationName);
        if (localData) {
            for (let i = 0; i < localData.length; i++) {
                for (let j = 0; j < this.stations.length; j++) {
                    if (localData[i].stationID === this.stations[j].stationID) {
                        this.stations[j].showCheckbox = localData[i].showCheckbox;
                        this.stations[j].status = localData[i].status;
                        break;
                    }
                }
            }
        }
        // this.inspectionService.removeOldLocalStorageData();
    }

    getItem(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

    chooseStation(event: StationModel) {
        this.navCtrl.push('ChecklistComponent', { data: event, stationId: event.stationID, lineName: this.lineName, lineId: this.lineId });
    }

    // 先检查是否已经全部打上勾，如果没有则报错
    async submitStations() {
        // let allCheck: boolean = true;
        // for (let i = 0; i < this.stations.length; i++) {
        //     if (this.stations[i].showCheckbox) { }
        //     else {
        //         this.commonService.showAlert('錯誤', `第${i + 1}項尚未進行檢查，請檢查后再提交。`);
        //         allCheck = false;
        //         break;
        //     }
        // }

        if (this.inspectionService.hasNoNetwork()) {
            this.commonService.showAlert(this.translateTexts['inspection.ipqa.prompt'], this.translateTexts['inspection.ipqa.noNetwork']);
        } else {
            let data: any[] = JSON.parse(localStorage.getItem(this.inspectionService.getLocalCheckResultName()));
            if (data && data.length > 0) {
                this.commonService.showLoading();
                for (let i = 0; i < data.length; i++) {
                    try {
                        let headerId: number = 0;
                        headerId = await this.inspectionService.postDataToServer(data[i].stationId, data[i].localName, data[i].banbie, data[i].checkList, data[i].lineName, data[i].title);

                        // 设置本地数据为posted状态
                        let localStorageStationName = this.inspectionService.getLocalStorageStationName(this.lineId);
                        let stationData: StationModel[] = JSON.parse(localStorage.getItem(localStorageStationName));
                        if (stationData && stationData.length > 0) {
                            for (let j = 0; j < stationData.length; j++) {
                                if (stationData[j].stationID === data[i].stationId) {
                                    stationData[j].status = 'posted';
                                    stationData[j].headerId = headerId;
                                    //????
                                    // 为什么post后再post数据会重复？？？
                                }

                            }
                            localStorage.setItem(localStorageStationName, JSON.stringify(stationData));
                        }

                        // 设置当前的变量状态为posted，从而画面显示已提交
                        for (let k = 0; k < this.stations.length; k++) {
                            if (this.stations[k].stationID === data[i].stationId) {
                                this.stations[k].status = 'posted';
                            }
                        }
                    } catch (e) {
                    }
                }
                this.commonService.hideLoading();
            }
        }
    }
}



