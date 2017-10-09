import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ModalController, ViewController, ActionSheetController, IonicPage } from 'ionic-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PluginService } from '../../../core/services/plugin.service';

@Component({
  selector: 'sg-photo-view',
  templateUrl: 'photo-view.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhotoViewComponent), multi: true, }],
})
export class PhotoViewComponent implements OnInit, ControlValueAccessor {

  private propagateChange = (_: any) => { };

  @Input()
  set opts(opts: any) {
    this.myOpts = Object.assign(this.myOpts, opts);
  }
  @Input()
  imgs: string[];
  outImgs: string[];

  myOpts = {
    addable: true,//是否能添加图片
    scanable: true,//是否进入能浏览图片
    removeable: true//是否能移除图片
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
    this.bindEventForArray(this.imgs)
  }

  /**
   * 对能改变数组的方法添加钩子函数
   * 
   * @param {any[]} array 
   */
  bindEventForArray(array:any[]) {
    let fun = ['push', 'pop', 'sort', 'reverse', 'unshift', 'shift', 'splice'];
    fun.forEach((item) =>{
      let _prototype = Array.prototype[item];
      let that = this;
      array[item] = function() {
        let new_value = _prototype.apply(this,arguments);
        that.outImgs = this.slice();
        that.emitChange(that.outImgs)
        return new_value;
      }
    })
  }

  /**
   * 给外部formControl写入数据
   * 
   * @param {*} value 
   */
  writeValue(value: any) {
    if (value != undefined) {
      if (value instanceof Array) {
        this.outImgs = value;
      } else {
        this.outImgs = [value];
      }
    } else{
      this.outImgs = [];
    }
    this.imgs = this.outImgs.slice();
    this.bindEventForArray(this.imgs)
  }

  /**
   * 把外面登记的监测change的函数赋值给this.propagateChange
   * 当内部数据改变时,可使用this.propagateChange(this.imgs.slice())去触发传递出去
   * @param {*} fn 
   */
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  /**
   * 也是一样注册然后调用当 touched 
   * @param {*} fn 
   */
  registerOnTouched(fn:any) { }

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
    this.imgs.push(temp);
  }

  /**
   * 选择图片，并用模态框展示
   * @param  {number} idx 当前图片的序号
   */
  selectPhoto(idx: number) {
    if (!this.myOpts.scanable) return
    this.presentProfileModal(idx);
  }

  /**
   * 初始化模态框
   * @param  {number} idx 当前图片的序号
   */
  presentProfileModal(idx: number) {
    let profileModal = this.modalCtrl.create('PhotoDetailComponent', { imgs: this.imgs, idx: idx, removeable: this.myOpts.removeable });
    profileModal.present();
  }

  /**
   * 把change冒泡到外部
   * 
   */
  emitChange(val:any) {
    this.imgsChange.emit(val);
    this.propagateChange(val)
  }
}
