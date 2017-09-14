import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, ViewController, ActionSheetController, IonicPage } from 'ionic-angular';
import { PluginService } from '../../../core/services/plugin.service';

@Component({
  selector: 'sg-photo-view',
  templateUrl: 'photo-view.component.html',
})
export class PhotoViewComponent implements OnInit {

  @Input()
  set opts(opts:any) {
    this.myOpts = Object.assign(this.myOpts,opts);
  }
  @Input()
  imgs: string[];

  myOpts={
    addable: true,
    scanable: true,
    removeable: true
  }

  //DATA_URL : 0 ,FILE_URI : 1, NATIVE_URI : 2
  @Input()
  destinationType: number = 0;
  @Output()
  imgsChange = new EventEmitter<string[]>();

  constructor(
    public modalCtrl: ModalController,
    private plugin: PluginService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    if (this.imgs) {

    } else {
      this.imgs = [];
    }
  }

  /**
   * 添加图片
   */
  addPhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '添加图片',
      buttons: [
        {
          text: '拍摄',
          handler: () => {
            this.getNewPhoto(1, 800);
          }
        }, {
          text: '从相册选择',
          handler: () => {
            this.getNewPhoto(0, 800);
          }
        }, {
          text: '取消',
          role: '取消',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * 获取图片
   * @param  {number} type 获取图片的途径，1时拍摄，2是相册
   * @param  {number} size 图片的最大分辨率
   */
  async getNewPhoto(type: number, size: number) {
    if (!this.plugin.isCordova()) return;
    let temp = await this.plugin.getNewPhoto(type, size, {
      allowEdit: false,
      quality: 100,
      destinationType: this.destinationType
    }).catch((e) => {
      console.log(e)
    });
    if (!temp) return;
    if (this.destinationType === 0) {
      temp = 'data:image/jpeg;base64,' + temp;
    }
    this.imgs.push(temp)
    this.imgsChange.emit(this.imgs);
  }

  /**
   * 选择图片，并用模态框展示
   * @param  {number} idx 当前图片的序号
   */
  selectPhoto(idx: number) {
    if(!this.myOpts.scanable) return
    this.presentProfileModal(idx);
  }

  /**
   * 初始化模态框
   * @param  {number} idx 当前图片的序号
   */
  presentProfileModal(idx: number) {
    let profileModal = this.modalCtrl.create('PhotoDetailComponent', { imgs: this.imgs, idx: idx , removeable: this.myOpts.removeable});
    profileModal.onDidDismiss(data => {
      this.imgsChange.emit(this.imgs)
    });
    profileModal.present();
  }
}
