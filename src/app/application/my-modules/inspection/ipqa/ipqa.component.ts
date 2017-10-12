import { CommonService } from './../../../../core/services/common.service';
import { EnvConfig } from './../../../../shared/config/env.config';
import { GridModel } from './grid/grid.component';
import { InspectionService } from './shared/service/inspection.service';
import { StationsComponent } from './../stations/stations.component';
import { NavController, IonicPage } from 'ionic-angular';
import { Observable, Observer } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
    selector: 'sg-ipqa',
    templateUrl: 'ipqa.component.html'
})
export class IpqaComponent implements OnInit {

    // 从服务器获取回来的线别选项
    lines: { LINE_NAME: string, LINE_ID: number }[] = [];
    // 用户选择的线别
    selectedLine: { LINE_NAME: string, LINE_ID: number };
    // 站点
    allStations: { STATION_NAME: string, STATION_ID: number }[] = [];
    // 被选择了的站点
    // selectedStations: { STATION_NAME: string, STATION_ID: number }[] = [];
    // 某线别下的模块
    modules: { title: string, showCheckbox: boolean }[] = [];
    // 该线别所有的模块
    allModules: { CATEGORY_NAME: string, CATEGORY_ID: number }[] = [];
    // 被选中的模块
    // selectedModules: { CATEGORY_NAME: string, CATEGORY_ID: number }[] = [];
    //
    stations: { title: string, showCheckbox: boolean }[] = [];
    translateTexts: any = {
        'inspection.ipqa.stationTitle': '',
        'inspection.ipqa.module': '',
        'inspection.ipqa.prompt': '',
        'inspection.ipqa.noNetwork': '',
    }; // 记录转换后的文本(简繁体)

    constructor(
        private navCtrl: NavController,
        private inspectionService: InspectionService,
        private translate: TranslateService,
        private commonService: CommonService
    ) {

    }

    async ngOnInit() {
        // let res = await this.inspectionService.getLines(EnvConfig.companyID);
        // this.lines = res.json();
        this.inspectionService.removeOldLocalStorageData();
        this.translateTexts = await this.translate.get(['inspection.ipqa.stationTitle', 'inspection.ipqa.module', 'inspection.ipqa.prompt', 'inspection.ipqa.noNetwork']).toPromise();

        // 无网络
        if (this.inspectionService.hasNoNetwork()) {
            let local: any[] = JSON.parse(localStorage.getItem(this.inspectionService.getLocalAllCheckListName()));
            if (local && local.length > 0) {
                // 无网络但有本地存储，不需要处理
                this.lines = await this.inspectionService.getLines(EnvConfig.companyID);
            } else {
                // 且没有本地数据
                this.commonService.showConfirm(this.translateTexts['inspection.ipqa.prompt'], this.translateTexts['inspection.ipqa.noNetwork'], () => {
                    this.navCtrl.pop();
                });
            }
        } else {

            // 把所有checklist保存在本地
            let localData = JSON.parse(localStorage.getItem(this.inspectionService.getLocalAllCheckListName()));
            if (localData && localData.length > 0) { }
            else {
                // 有网络。本地没有数据的话刷新本地check list
                this.commonService.showLoading();
                let allCheckList = await this.inspectionService.getAllCheckList(EnvConfig.companyID, 'IPQA');
                localStorage.setItem(this.inspectionService.getLocalAllCheckListName(), JSON.stringify(allCheckList.json()));
                this.commonService.hideLoading();
            }

            // 目的是提前把班別查詢保存到本地，後續就可以離線操作了
            await this.inspectionService.getBanBie();
            this.lines = await this.inspectionService.getLines(EnvConfig.companyID);

        }



    }

    async onSelectChange() {

        // 获取该线别下的所有模块
        // let res = await this.inspectionService.getCategoryByLine(EnvConfig.companyID, this.selectedLine.LINE_ID);
        // this.allModules = res.json();

        this.allModules = await this.inspectionService.getCategoryByLine(EnvConfig.companyID, this.selectedLine.LINE_ID);
        // console.log(this.allModules);

        this.modules = this.addCheckboxAttribute(this.allModules, true);


        // 获取该线别下的所有站点
        // let result = await this.inspectionService.getStationByLine(EnvConfig.companyID, this.selectedLine.LINE_ID);
        // this.allStations = result.json();
        this.allStations = await this.inspectionService.getStationByLine(EnvConfig.companyID, this.selectedLine.LINE_ID);
        this.stations = this.addCheckboxAttribute(this.allStations, true);
    }

    addCheckboxAttribute(target: any[], showFlag: boolean) {
        let temp: any[] = [];
        target.forEach((v, i) => {
            temp.push({
                title: v[Object.keys(v)[0]],
                showCheckbox: showFlag
            });
        });
        return temp;
    }

    /**
     * @param  {GridModel} 记录从子组件返回的模块数组
     */
    async changeModule(module: GridModel) {

        this.modules.forEach((value, index) => {
            if (value.title === module.title) {
                value.showCheckbox = module.showCheckbox;
            }
        });
        let categoryIds: number[] = [];
        let showModules = this.modules.filter((value) => {
            return value.showCheckbox;
        });
        showModules.forEach((value, index) => {
            let id = this.getModuleId(value.title);
            if (id > 0) {
                categoryIds.push(id);
            }
        });
        if (categoryIds.length <= 0) {
            categoryIds.push(-1);
        }
        // let res = await this.inspectionService.getStationByCategory(EnvConfig.companyID, this.selectedLine.LINE_ID, categoryIds);
        // let stationResult = res.json();
        let stationResult = await this.inspectionService.getStationByCategory(EnvConfig.companyID, this.selectedLine.LINE_ID, categoryIds);
        this.stations = this.addCheckboxAttribute(stationResult, true);
    }

    getModuleId(moduleName: string) {
        let id: number = -1;
        for (let i = 0; i < this.allModules.length; i++) {
            if (this.allModules[i].CATEGORY_NAME === moduleName) {
                id = this.allModules[i].CATEGORY_ID;
                break;
            }
        }
        return id;
    }

    /**
     * @param  {GridModel} 记录从子组件返回的站点数组
     */
    changeStation(stations: GridModel) {
        this.stations.forEach((value, index) => {
            if (value.title === stations.title) {
                this.stations[index].showCheckbox = stations.showCheckbox;
            }
        });
    }

    goToChooseStationPage() {
        this.stations.forEach((value, index) => {
            value["STATION_ID"] = this.getStationId(value.title);
        });
        this.navCtrl.push('StationsComponent', { stations: this.stations, lineName: this.selectedLine.LINE_NAME, lineId: this.selectedLine.LINE_ID });
    }

    getStationId(stationName: string) {
        let id: number = -1;
        for (let i = 0; i < this.allStations.length; i++) {
            if (this.allStations[i].STATION_NAME === stationName) {
                id = this.allStations[i].STATION_ID;
                break;
            }
        }
        return id;
    }



}