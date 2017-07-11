import { Component, OnInit, Input } from '@angular/core';
// import { ChartService } from '../shared/service/chart.service';

@Component({
    selector: 'sg-chartcomponent',
    templateUrl: 'chart.component.html'
})

export class ChartComponent implements OnInit {
    @Input() content: string;
    options: string;

    constructor() { }

    ngOnInit() {
        this.options = JSON.parse(this.content);
    }
}

