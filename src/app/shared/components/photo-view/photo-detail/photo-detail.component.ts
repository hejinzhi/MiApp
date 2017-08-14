import { Component, OnInit, ViewChild  } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'sg-photo-detail',
  templateUrl: 'photo-detail.component.html',
})
export class PhotoDetailComponent implements OnInit {

  imgs:string[];
  pageX:number;// 记录开始按的X位置
  idx:number = 0; // 目前显示图片的序号
  timeStart:number; // 记录开始按的X时间
  move:number; // 记录拖动的的横向距离
  currentPosition:number=0; // 目前偏移的位置
  whole:number = document.body.offsetWidth; // 屏幕的宽度

  @ViewChild('photoView') photoView:any;
  constructor(
    private viewCtr: ViewController,
    private params: NavParams,
    private alertCtrl: AlertController
  ) {  }


  ngOnInit() {
    this.imgs = this.params.data.imgs || [];
    this.idx = this.params.data.idx || 0;
    this.switch(this.idx);
  }
  /**
   * 返回
   */
  exit() {
    this.viewCtr.dismiss()
  }

  /**
   * 删除
   */
  delete() {
    let confirm = this.alertCtrl.create({
      title: `提示`,
      message: `要删除这张图片吗?`,
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确定',
          handler: () => {
            this.imgs.splice(this.idx,1);
            this.idx = this.idx>this.imgs.length-1?--this.idx:this.idx;
            if(this.idx === -1) {
              this.viewCtr.dismiss();
            } else {
              this.switch(this.idx)
            }
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * 拖动开始
   * @param  {Event}    e 事件
   */
  draftStart(e: any) {
    this.pageX = e.touches[0].pageX;
    this.timeStart = e.timeStamp;
  }

  /**
   * 拖动中
   * @param  {Event}    e 事件
   */
  draft(e: any) {
    this.move = e.touches[0].pageX - this.pageX;
    this.photoView.nativeElement.style.transform = 'translateX('+(this.currentPosition +this.move/2) + 'px'+')';
  }

  /**
   * 拖动结束
   * @param  {Event}    e 事件
   */
  draftEnd(e: any) {
    let length = this.imgs.length;
    if(e.timeStamp - this.timeStart < 1500 && Math.abs(this.move)>50) {
      if(this.move>0) {
        this.idx--;
      } else {
        this.idx++;
      }
      this.idx = Math.min(this.idx,length-1);
      this.idx = Math.max(0,this.idx);

    }
    this.switch(this.idx);
  }

  /**
   * 根据选择的序号移动图片容器
   * @param  {number} idx 选择的图片的序号
   */
  switch(idx:number) {
    let margin:number = 6;
    this.currentPosition = -((this.whole+margin)*(idx));
    this.photoView.nativeElement.style.transform = 'translateX('+this.currentPosition + 'px'+')';
  }
}
