import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ng2EmojiService } from '../shared/service/emojis.service';
@Component({
  selector: 'sg-emoji',
  templateUrl: 'emoji.component.html',
})
export class EmojiComponent implements OnInit {

  emojis = Ng2EmojiService.emojis.slice(0,64);
  @Output() selectEmoji = new EventEmitter();
  constructor() {  }

  ngOnInit() {
  }

  select(item:any) {
    this.selectEmoji.emit(':'+item+':');
  }
  cancel() {
    
  }
}
