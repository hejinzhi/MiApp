import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sg-organization',
    templateUrl: 'organization.component.html'
})
export class OrganizationComponent implements OnInit {
    parentDept: any;  // 父部门
    childrenDeptList: any[] = []; // 子部门列表

    constructor() { }

    ngOnInit() { }

    test() {
        console.log('test');
    }
}