import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import { ChartService } from '../../../application/my-modules/chart/shared/service/chart.service';

@Directive({
    selector: '[drawChat]'
})
export class DrawChartDirective implements AfterViewInit {
    @Input() option: any;

    constructor(
        private elementRef: ElementRef,
        private chartService: ChartService
    ) {

    }

    ngAfterViewInit() {
        let echarts = this.chartService.getAutoResizeChart();;
        let mychart = echarts.init(this.elementRef.nativeElement);
        mychart.setOption(this.option);
        return mychart;
    }
}