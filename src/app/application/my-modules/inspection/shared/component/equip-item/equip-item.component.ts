import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sg-equip-item',
  templateUrl: 'equip-item.component.html'
})
export class EquipItemComponent implements OnInit {

  @Input()
  item:any;
  constructor() { }

  ngOnInit() {
  }

}
