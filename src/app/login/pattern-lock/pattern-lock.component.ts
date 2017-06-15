import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginComponent } from '../login.component';
import { TabsComponent } from '../../tabs/tabs.component';

import { MyHttpService } from '../../core/services/myHttp.service';
import { JMessageService } from '../../core/services/jmessage.service';
import { PluginService }   from '../../core/services/plugin.service';

import { LoginConfig } from '../shared/config/login.config';

@Component({
  selector: 'sg-pattern-lock',
  templateUrl: 'pattern-lock.component.html'
})
export class PatternLockComponent implements OnInit {

  mySubcribe:any;
  isLandscape:boolean;

  needNineCode: boolean;
  user: any;
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
  canvas:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myHttp: MyHttpService,
    private jmessageService: JMessageService,
    private plugin: PluginService,
    private ref: ChangeDetectorRef
  ) {
    // 判定是否是进行验证功能还是更改功能
    // this.needNineCode = localStorage.getItem('needPassNineCode') == 'true' ? true : false;
    // this.isVal = !this.navParams.data.reset ? true : false;
    // this.message = this.isVal ? '请验证手势密码' : '请输入原来的密码';
    // this.isReSet = localStorage.getItem('myNineCode') ? false : true;
    // this.message = this.isReSet ? '请设置手势密码' : this.message;
  }



  ngOnInit() { }

  back() {
    this.navCtrl.pop();
  }

  // 启用手势密码的开关
  toggleBtn(event: any) {
    if (event.checked) {
      this.needNineCode = true;
      if (this.user && this.user.myNineCode) {

      } else {
        this.message = '请设置手势密码';
      }

    } else {
      this.needNineCode = false;
      this.user.myNineCode = '';
      this.isReSet = true;
      localStorage.setItem('currentUser', JSON.stringify(this.user));
    }
  }

  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this.user && this.user.myNineCode) {
      this.needNineCode = true;
      this.isReSet = false;
    } else {
      this.needNineCode = false;
      this.isReSet = true;
    }

    this.isVal = !this.navParams.data.reset ? true : false;
    this.message = this.isVal ? '请验证手势密码' : '请输入原来的密码';
    this.message = this.isReSet ? '请设置手势密码' : this.message;

    this.canvas = document.getElementById("lockCanvas");
    let orientation = this.plugin.getScreenOrientation();
    this.isLandscape = orientation.type.indexOf('landscape') > -1? true:false;
    this.ref.detectChanges();
  }

  // 忘记手势密码
  validateId(): void {
    // localStorage.setItem('toValiPassword', 'true');
    this.user.myNineCode = '';
    localStorage.setItem('currentUser', JSON.stringify(this.user));
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
    let leftHeight = document.body.offsetHeight - this.headHeight+ 80;
    if(this.isVal) {
      console.log(this.headHeight)
      this.canvasHeight = (Math.min(this.headHeight,265) / 0.35 * 0.65 - 80);
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
    let orientation = this.plugin.getScreenOrientation();
    this.initCode();
    this.mySubcribe = orientation.onChange().subscribe((value) => {
      this.isLandscape = orientation.type.indexOf('landscape') > -1? true:false;
      this.ref.detectChanges();
      this.circleArr =[];
      this.canvas.height=this.canvas.height;
      setTimeout(() => {
        this.initCode();
      },200)
    })
  }
  ionViewWillLeave() {
    this.mySubcribe.unsubscribe();
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
    canvas.addEventListener("touchend", (e: any) => {
      cxt.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.Draw(cxt, this.circleArr, [], null);

      if (this.isReSet) {
        if (this.myCode.length > 0) {
          if (this.myCode.join('') == pwdArr.join('')) {
            this.message = '手势密码设置成功';
            // localStorage.setItem('myNineCode', this.myCode.join(''));
            // localStorage.setItem('needPassNineCode', 'true');
            this.user.myNineCode = this.myCode.join('');
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            setTimeout(() => {
              if (!this.isVal) {
                this.navCtrl.pop();
              } else {
                this.navCtrl.setRoot(TabsComponent);
              }
            }, 300)
          } else {
            this.message = '两次密码不一致,请重新设置';
          }
        } else {
          this.myCode = pwdArr;
          this.message = '请再次输入密码';
        }
      } else {
        //用户验证判定
        if (this.isVal) {
          // if (localStorage.getItem('myNineCode') == pwdArr.join('')) {
          if (this.user.myNineCode == pwdArr.join('')) {
            this.message = '密码正确';
            // let user = JSON.parse(localStorage.getItem('currentUser'));
            this.myHttp.post(LoginConfig.loginUrl, { userName: this.user.username, password: this.user.password }, true).then((res) => {
              this.user.avatarUrl = res.json().User.AVATAR_URL;
              this.user.nickname = res.json().User.NICK_NAME;
              this.user.position = res.json().User.JOB_TITLE;
              this.user.department = res.json().User.DEPT_NAME;
              this.user.empno = res.json().User.EMPNO;
              localStorage.setItem('currentUser', JSON.stringify(this.user));
            });
            this.navCtrl.setRoot(TabsComponent);
            // this.jmessageService.login(this.user.username, this.user.password).then(() => {
            //   // to do loadUnreadMessage
            //   this.navCtrl.setRoot(TabsComponent);
            // });
          } else {
            this.message = '密码错误！！！';
          }
          // 更改手势密码判定
        } else {
          // 判定是否已经验证原始密码
          if (this.canChange) {
            if (this.myCode.length > 0) {
              if (this.myCode.join('') == pwdArr.join('')) {
                this.message = '已更新密码';
                // localStorage.setItem('myNineCode', this.myCode.join(''));
                this.user.myNineCode = this.myCode.join('');
                localStorage.setItem('currentUser', JSON.stringify(this.user));
                setTimeout(() => {
                  this.navCtrl.pop();
                }, 300)
              } else {
                this.message = '两次密码不一致,请重新设置';
                this.myCode = [];
              }
            } else {
              this.myCode = pwdArr;
              this.message = '请再次输入密码';
            }
          } else {
            // if (localStorage.getItem('myNineCode') == pwdArr.join('')) {
            if (this.user.myNineCode == pwdArr.join('')) {
              this.canChange = true;
              this.message = '请设置新的密码'
            } else {
              this.canChange = false;
              this.message = '请重新输入,与原密码不一致'
            }
          }
        }
      }
      pwdArr = [];
    }, false);
  }

}
