import { Subscription } from 'rxjs/rx';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { LoginComponent } from '../login.component';
import { TabsComponent } from '../../tabs/tabs.component';

import { MyHttpService } from '../../core/services/myHttp.service';
import { JMessageService } from '../../core/services/jmessage.service';
import { PluginService } from '../../core/services/plugin.service';
import { LoginService } from './../shared/service/login.service';
import { User_Clear, User_Update } from './../../shared/actions/user.action';
import { MyStore } from './../../shared/store';
import { UserState } from './../../shared/models/user.model';

@Component({
  selector: 'sg-pattern-lock',
  templateUrl: 'pattern-lock.component.html'
})
export class PatternLockComponent implements OnInit, OnDestroy {
  needNineCode: boolean;
  user: UserState;
  R: number;
  canvasWidth: number;
  canvasHeight: number;
  OffsetX: number;
  OffsetY: number;
  circleArr: { X: number, Y: number }[] = [];
  message: string;
  canChange: boolean;
  isVal: boolean = true; // 是否转换带头像的登录验证画面
  headHeight: number;
  isReSet: boolean;
  myCode: number[] = [];
  canvas: any;
  isHere: boolean = true;
  translateTexts: any = {};
  mysubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myHttp: MyHttpService,
    private jmessageService: JMessageService,
    private plugin: PluginService,
    private ref: ChangeDetectorRef,
    private platform: Platform,
    private translate: TranslateService,
    private store$: Store<MyStore>,
    private loginService: LoginService,
  ) {

  }

  ngOnInit() { 
    this.subscribeTranslateText();
    this.mysubscription = this.store$.select('userReducer').subscribe((user:UserState) => this.user = user);
  }

  ngOnDestroy() {
    this.mysubscription.unsubscribe();
  }

  subscribeTranslateText() {
    this.translate.stream(['PatternLock.set', 'PatternLock.validate', 'PatternLock.original', 'PatternLock.reset_succ', 'PatternLock.reset_err',
    'PatternLock.repeat', 'PatternLock.right', 'PatternLock.vali_wrong', 'PatternLock.reset', 'PatternLock.vali_wrong1', 'PatternLock.update', 'autologin_err'
  ]).subscribe((res) => {
        this.translateTexts = res;
      })
  }

  back() {
    this.navCtrl.pop();
  }

  // 启用手势密码的开关
  toggleBtn(event: any) {
    if (event.checked) {
      this.needNineCode = true;
      if (this.user && this.user.myNineCode) {

      } else {
        this.message = this.translateTexts['PatternLock.set'];
      }

    } else {
      this.needNineCode = false;
      this.user.myNineCode = '';
      this.isReSet = true;
      this.store$.dispatch(new User_Update(this.user));
    }
  }

  ionViewDidLoad() {
    if (this.user && this.user.myNineCode) {
      this.needNineCode = true;
      this.isReSet = false;
    } else {
      this.needNineCode = false;
      this.isReSet = true;
    }

    this.isVal = !this.navParams.data.reset ? true : false;
    this.message = this.isVal ? this.translateTexts['PatternLock.validate'] : this.translateTexts['PatternLock.original'];
    this.message = this.isReSet ? this.translateTexts['PatternLock.set'] : this.message;

    this.canvas = document.getElementById("lockCanvas");
  }

  // 忘记手势密码
  validateId(): void {
    // localStorage.setItem('toValiPassword', 'true');
    this.user.myNineCode = '';
    this.store$.dispatch(new User_Update(this.user));
    this.navCtrl.setRoot(LoginComponent);
  }

  //更换用户名
  switchUser(): void {
    this.navCtrl.setRoot(LoginComponent);
  }

  // 保存用户设定
  save() {
    if (this.needNineCode) {
      localStorage.setItem('needPassNineCode', 'true');
    } else {
      localStorage.setItem('needPassNineCode', 'false');
      localStorage.removeItem('myNineCode');
    }
    this.navCtrl.pop();
  }

  // 跳过并不设置手势密码
  skip(): void {
    localStorage.setItem('needPassNineCode', 'false');
    this.navCtrl.setRoot(TabsComponent);
  }

  initCode() {
    // 初始化验证过程
    this.myCode = [];

    //设置为先验证旧密码
    this.canChange = false;
    //获取canvas顶部元素的高度，对后面的触摸判断作调整
    let headCode: any = document.getElementById('headCode');
    this.headHeight = headCode.offsetHeight;

    this.canvasWidth = document.body.offsetWidth;//网页可见区域宽
    let leftHeight = document.body.offsetHeight - this.headHeight + 80;
    if (this.isVal) {
      this.canvasHeight = (Math.min(this.headHeight, 265) / 0.35 * 0.65 - 80);
    } else {
      this.canvasHeight = this.headHeight / 0.18 * 0.6 - 80;
    }
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.R = this.canvasHeight / 11;
    this.OffsetX = this.OffsetY = this.R
    var cxt = this.canvas.getContext("2d");
    /**
     * 每行3个圆
     * OffsetX为canvas x方向内边距
     * */
    var X = (this.canvasWidth - 2 * this.OffsetX - this.R * 2 * 3) / 2;
    var Y = (this.canvasHeight - 2 * this.OffsetY - this.R * 2 * 3) / 2;

    this.createCirclePoint(X, Y);

    this.bindEvent(this.canvas, cxt);
    //CW=2*offsetX+R*2*3+2*X
    this.Draw(cxt, this.circleArr, [], null);
  }
  ionViewWillEnter() {
    this.initCode();
    window.addEventListener('resize', () => {
      if (!this.isHere) return;
      this.ref.detectChanges();
      this.circleArr = [];
      this.canvas.height = this.canvas.height;
      setTimeout(() => {
        this.initCode();
      }, 200)
    })
  }
  ionViewWillLeave() {
    this.isHere = false;
  }
  createCirclePoint(diffX: number, diffY: number) {
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        // 计算圆心坐标
        var Point = {
          X: (this.OffsetX + col * diffX + (col * 2 + 1) * this.R),
          Y: (this.OffsetY + row * diffY + (row * 2 + 1) * this.R)
        };
        this.circleArr.push(Point);
      }
    }
  }

  Draw(cxt: any, circleArr: { X: number, Y: number }[], pwdArr: any, touchPoint: any) {
    if (pwdArr.length > 0) {
      cxt.beginPath();
      for (var i = 0; i < pwdArr.length; i++) {
        var pointIndex = pwdArr[i];
        cxt.lineTo(circleArr[pointIndex].X, circleArr[pointIndex].Y);
      }
      cxt.lineWidth = 10;
      cxt.strokeStyle = "#627eed";
      cxt.stroke();
      cxt.closePath();
      if (touchPoint != null) {
        var lastPointIndex = pwdArr[pwdArr.length - 1];
        var lastPoint = circleArr[lastPointIndex];
        cxt.beginPath();
        cxt.moveTo(lastPoint.X, lastPoint.Y);
        cxt.lineTo(touchPoint.X, touchPoint.Y);
        cxt.stroke();
        cxt.closePath();
      }
    }
    for (var i = 0; i < circleArr.length; i++) {
      var Point = circleArr[i];
      cxt.fillStyle = "#627eed";
      cxt.beginPath();
      cxt.arc(Point.X, Point.Y, this.R, 0, Math.PI * 2, true);
      cxt.closePath();
      cxt.fill();
      cxt.fillStyle = "#ffffff";
      cxt.beginPath();
      cxt.arc(Point.X, Point.Y, this.R - 3, 0, Math.PI * 2, true);
      cxt.closePath();
      cxt.fill();
      if (pwdArr.indexOf(i) >= 0) {
        cxt.fillStyle = "#627eed";
        cxt.beginPath();
        cxt.arc(Point.X, Point.Y, this.R - 16, 0, Math.PI * 2, true);
        cxt.closePath();
        cxt.fill();
      }

    }
  }

  getSelectPwd(touches: any, pwdArr: any) {
    for (var i = 0; i < this.circleArr.length; i++) {
      var currentPoint = this.circleArr[i];
      var xdiff = Math.abs(currentPoint.X - touches.pageX);
      var ydiff = Math.abs(currentPoint.Y + this.headHeight - touches.pageY);
      var dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
      if (dir > this.R * 1.1 || pwdArr.indexOf(i) >= 0) {
        continue;
      }
      pwdArr.push(i);
      break;
    }
  }

  bindEvent(canvas: any, cxt: any) {
    var pwdArr: any = [];
    canvas.addEventListener("touchstart", (e: any) => {
      this.getSelectPwd(e.touches[0], pwdArr);
      this.message = '';
    }, false);
    canvas.addEventListener("touchmove", (e: any) => {
      e.preventDefault();
      var touches = e.touches[0];
      this.getSelectPwd(touches, pwdArr);
      cxt.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.Draw(cxt, this.circleArr, pwdArr, { X: touches.pageX, Y: touches.pageY - this.headHeight });
    }, false);
    canvas.addEventListener("touchend", async (e: any) => {
      cxt.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.Draw(cxt, this.circleArr, [], null);

      if (this.isReSet) {
        if (this.myCode.length > 0) {
          if (this.myCode.join('') == pwdArr.join('')) {
            this.message = this.translateTexts['PatternLock.reset_succ'];
            // localStorage.setItem('myNineCode', this.myCode.join(''));
            // localStorage.setItem('needPassNineCode', 'true');
            this.user.myNineCode = this.myCode.join('');
            this.store$.dispatch(new User_Update(this.user));
            setTimeout(() => {
              if (!this.isVal) {
                this.navCtrl.pop();
              } else {
                this.navCtrl.setRoot(TabsComponent);
              }
            }, 300)
          } else {
            this.message = this.translateTexts['PatternLock.reset_err'];
          }
        } else {
          this.myCode = pwdArr;
          this.message = this.translateTexts['PatternLock.repeat'];
        }
      } else {
        //用户验证判定
        if (this.isVal) {
          // if (localStorage.getItem('myNineCode') == pwdArr.join('')) {
          if (this.user.myNineCode == pwdArr.join('')) {
            this.message = this.translateTexts['PatternLock.right'];
            // let user = JSON.parse(localStorage.getItem('currentUser'));
            let ADloginSuccess = await this.loginService.myADLogin(this.user.username, this.user.password);
            if (ADloginSuccess) {
                let jMsgLoginSuccess = await this.loginService.jMessageLogin(this.user.username, this.user.password);
                if(jMsgLoginSuccess) {
                  this.navCtrl.setRoot(TabsComponent);
                } else {
                  this.loginErrorDeal();
                }
            } else {
              this.loginErrorDeal();
            }
          } else {
            this.message = this.translateTexts['PatternLock.vali_wrong'];
          }
          // 更改手势密码判定
        } else {
          // 判定是否已经验证原始密码
          if (this.canChange) {
            if (this.myCode.length > 0) {
              if (this.myCode.join('') == pwdArr.join('')) {
                this.message = this.translateTexts['PatternLock.update'];
                // localStorage.setItem('myNineCode', this.myCode.join(''));
                this.user.myNineCode = this.myCode.join('');
                this.store$.dispatch(new User_Update(this.user));
                setTimeout(() => {
                  this.navCtrl.pop();
                }, 300)
              } else {
                this.message = this.translateTexts['PatternLock.reset_err'];
                this.myCode = [];
              }
            } else {
              this.myCode = pwdArr;
              this.message = this.translateTexts['PatternLock.repeat'];
            }
          } else {
            // if (localStorage.getItem('myNineCode') == pwdArr.join('')) {
            if (this.user.myNineCode == pwdArr.join('')) {
              this.canChange = true;
              this.message = this.translateTexts['PatternLock.reset']
            } else {
              this.canChange = false;
              this.message = this.translateTexts['PatternLock.vali_wrong1']
            }
          }
        }
      }
      pwdArr = [];
    }, false);
  }

  loginErrorDeal() {
    this.plugin.showToast(this.translateTexts['autologin_err'], 'top', 4000);
    this.store$.dispatch(new User_Clear())
    this.navCtrl.setRoot(LoginComponent);
  }

}
