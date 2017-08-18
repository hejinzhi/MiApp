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
    line: string;
    // 某线别下的模块
    modules: string[] = [];
    // 站点,不带状态的。就是没有记录用户是否勾选了这个站点
    stations: string[] = [];

    // 被选择了的站点
    selectedStations: string[] = [];

    constructor(
        private navCtrl: NavController,
        private inspectionService: InspectionService
    ) {

    }


    async ngOnInit() {
        this.lines = await this.inspectionService.getLines();
    }

    /**
     * @param  {string} selectedValue --记录用户选择的线别
     */
    async onSelectChange(line: string) {
        // 获取该线别下的所有模块
        this.modules = await this.inspectionService.getModules(line);
        // 获取该线别下的所有站点
        this.stations = await this.inspectionService.getAllStations(line);
        this.selectedStations = this.stations;
    }


    /**
     * @param  {GridModel} 记录从子组件返回的模块数组
     */
    async changeModule(modules: GridModel[]) {
        let result: string[] = [];
        modules.forEach((module) => {
            if (module.showCheckbox) {
                result.push(module.title);
            }
        });
        this.stations = await this.inspectionService.getStationsByModules(result);
        this.selectedStations = this.stations;
    }

    /**
     * @param  {GridModel} 记录从子组件返回的站点数组
     */
    changeStation(stations: GridModel[]) {
        let temp: string[] = [];
        stations.filter((s) => {
            return s.showCheckbox === true;
        }).forEach((v) => {
            temp.push(v.title);
        });
        // this.stations = temp;
        this.selectedStations = temp;
    }

    goToChooseStationPage() {
        this.navCtrl.push(StationsComponent, { stations: this.selectedStations });
    }

    // addShowCheckboxAttribute(stations: string[]): GridModel[] {
    //     let temp: GridModel[] = [];
    //     stations.forEach((station) => {
    //         temp.push({
    //             title: station,
    //             showCheckbox: true
    //         });
    //     });
    //     return temp;
    // }


}