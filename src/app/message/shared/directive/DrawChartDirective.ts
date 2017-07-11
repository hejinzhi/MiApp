import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';

@Directive({
    selector: '[drawChat]'
})
export class DrawChartDirective implements AfterViewInit {
    @Input() option: any;

    constructor(
        private elementRef: ElementRef
    ) {

    }

    ngAfterViewInit() {
        // console.log(this.option,666);
        let mychart = echarts.init(this.elementRef.nativeElement);
        mychart.setOption(this.option);
        return mychart;
    }
}