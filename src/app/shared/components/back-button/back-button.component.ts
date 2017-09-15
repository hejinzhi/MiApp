import { Platform } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sg-back-button',
  templateUrl: 'back-button.component.html'
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
