import { StationsComponent } from './../stations/stations.component';
import { NavController } from 'ionic-angular';
import { GridModel } from './../grid/grid.component';
import { Observable, Observer } from 'rxjs/Rx';
import { InspectionService } from './../shared/service/inspection.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sg-ipqa',
    templateUrl: 'ipqa.component.html'
})
export class IpqaComponent implements OnInit {

    // 从服务器获取回来的线别选项
    lines: string[] = [];
    // 用户选择的线别
    line: any[];
    // 某线别下的模块
    modules: GridModel[] = [];
    // 站点
    stations: GridModel[] = [];

    // 被选择了的站点
    selectedStations: string[] = [];

    // 被选中的模块
    selectedModules: any[] = [];

    constructor(
        private navCtrl: NavController,
        private inspectionService: InspectionService
    ) {

    }

    async ngOnInit() {
        // this.lines = await this.inspectionService.getLines();
        let res = await this.inspectionService.getLines();
        this.lines = res.json();
    }

    /**
     * @param  {string} selectedValue --记录用户选择的线别
     */
    async onSelectChange(line: string) {
        // 获取该线别下的所有模块
        let moduleResult: string[] = await this.inspectionService.getModules(line);
        this.selectedModules = moduleResult;
        this.modules = this.addCheckboxAttribute(moduleResult, true);


        // 获取该线别下的所有站点
        let stationResult = await this.inspectionService.getAllStations(line);
        this.stations = this.addCheckboxAttribute(stationResult, true);
    }


    addCheckboxAttribute(target: string[], showFlag: boolean): GridModel[] {
        let temp: GridModel[] = [];
        target.forEach((v, i) => {
            temp.push({
                title: v,
                showCheckbox: showFlag
            });
        });
        return temp;
    }


    /**
     * @param  {GridModel} 记录从子组件返回的模块数组
     */
    async changeModule(module: GridModel) {
        let result: string[] = [];
        // modules.forEach((module) => {
        //     if (module.showCheckbox) {
        //         result.push(module.title);
        //     }
        // });
        let index = this.selectedModules.indexOf(module.title);
        if (module.showCheckbox) {
            if (index === -1) {
                this.selectedModules.push(module.title);
            }
        } else {
            if (index > -1) {
                this.selectedModules.splice(index, 1);
            }
        }
        let stationResult = await this.inspectionService.getStationsByModules(this.selectedModules);
        this.stations = this.addCheckboxAttribute(stationResult, true);
    }

    /**
     * @param  {GridModel} 记录从子组件返回的站点数组
     */
    changeStation(stations: GridModel) {
        // let temp: GridModel[] = [];
        // stations.filter((s) => {
        //     return s.showCheckbox === true;
        // }).forEach((v) => {
        //     temp.push({
        //         title: v.title,
        //         showCheckbox: true
        //     });
        // });
        // this.stations = temp;
        // this.selectedStations = temp;
        this.stations.forEach((value, index) => {
            if (value.title === stations.title) {
                this.stations[index].showCheckbox = stations.showCheckbox;
            }
        });
    }

    goToChooseStationPage() {
        this.navCtrl.push(StationsComponent, { stations: this.stations, line: this.line });
    }



}