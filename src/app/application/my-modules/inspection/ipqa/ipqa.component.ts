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
    // 站点
    stations: string[] = [];

    constructor(
        private inspectionService: InspectionService
    ) {

    }


    async ngOnInit() {
        this.lines = await this.inspectionService.getLines();
        console.log(this.lines)
    }

    /**
     * @param  {string} selectedValue --记录用户选择的线别
     */
    async onSelectChange(line: string) {
        // 获取该线别下的所有模块
        this.modules = await this.inspectionService.getModules(line);
        // 获取该线别下的所有站点
        this.stations = await this.inspectionService.getAllStations(line);
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
    }

    /**
     * @param  {GridModel} 记录从子组件返回的站点数组
     */
    changeStation(stations: GridModel) {
        console.log(stations);
    }


}