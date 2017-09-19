import { Platform } from 'ionic-angular';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sg-back-button',
  templateUrl: 'back-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackButtonComponent implements OnInit {

  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  exit() {
    this.platform.runBackButtonAction()
  }

}
