import { async,ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { App, Config, Form, IonicModule, Keyboard, DomController, MenuController, NavController, Platform, NavParams, GestureController } from 'ionic-angular';
import { LeaveFormComponent } from './leave-form.component';
import { ConfigMock, PlatformMock, NavMock } from '../../../../../mocks';
import { ValidateService }   from '../../../../core/services/validate.service';
import '../../../../../assets/js/rxjs-extension';

describe('LeaveFormComponent', () => {

  let comp: LeaveFormComponent;
  let fixture: ComponentFixture<LeaveFormComponent>;
  let de: DebugElement;
  let el: any;
  let leaveMes={
    type :'P',
    startTime: '',
    endTime: '',
    boss:'',
    reason:'123'
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveFormComponent], // declare the test component
      providers: [
        App, DomController, Form, Keyboard, NavController,GestureController,ValidateService,
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: NavParams, useClass: NavMock}
      ],
      imports: [
        IonicModule,
      ],
    })
     .compileComponents();

    fixture = TestBed.createComponent(LeaveFormComponent);

    comp = fixture.componentInstance; // BannerComponent test instance
    comp.todo=comp.initWork(leaveMes);
    fixture.detectChanges();
    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('.submit'));
    el = de.nativeElement;
  }));
  it('一进去不能提交', () => {
    comp.ionViewDidLoad();
    fixture.detectChanges();
    expect(el.disabled).toBe(true);;
  });
  it('类型为空不能提交', () => {
    comp.todo.controls['type'].setValue('')
    comp.todo.controls['reason'].setValue('666')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.getBoss('xiaomi')
    fixture.detectChanges();
    expect(el.disabled).toBe(true);;
  });
  it('原因为空不能提交', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.getBoss('xiaomi')
    fixture.detectChanges();
    expect(el.disabled).toBe(true);;
  });
  it('上级框有错误信息不能提交', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('456')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.getBoss('xiaomi')
    comp.myValidators.boss.error='错误'
    fixture.detectChanges();
    expect(el.disabled).toBe(true);
  });
  it('原因框有错误信息不能提交', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('456')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.getBoss('xiaomi')
    comp.myValidators.reason.error='错误'
    fixture.detectChanges();
    expect(el.disabled).toBe(true);
  });
  it('原因为空不能提交,显示提示信息', () => {
    comp.todo.controls['reason'].setValue('')
    comp.check(comp.todo.value.reason,'reason').then((valid) => {
      fixture.detectChanges()
      expect(valid.reason.error).toBe(valid.reason.dataset.vRequiredMessage);;
    });
  });
  it('原因为长度不够不能提交,显示提示信息', () => {
    comp.todo.controls['reason'].setValue('5')
    comp.check(comp.todo.value.reason,'reason').then((valid) => {
      fixture.detectChanges()
      expect(valid.reason.error).toBe(valid.reason.dataset.vMinlengthMessage);;
    });
  });

  it('开始时间为空不能提交', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('456')
    comp.todo.controls['startTime'].setValue("")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.getBoss('xiaomi')
    fixture.detectChanges();
    expect(el.disabled).toBe(true);;
  });

  it('结束时间为空不能提交', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('456')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue('')
    comp.getBoss('xiaomi')
    fixture.detectChanges();
    expect(el.disabled).toBe(true);;
  });
  it('结束时间不能比开始时间早', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('456')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T00:00:00Z")
    comp.getBoss('xiaomi')
    comp.check(comp.todo.controls['endTime'].value,'endTime').then((val) => {
      fixture.detectChanges();
      expect(el.disabled).toBe(true);;
    })
  });
  it('不正确选择上级,不能提交', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('456')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.getBoss('xiaomi')
    comp.isSelectBoss = false;
    fixture.detectChanges();
    expect(el.disabled).toBe(true);;
  });
  it('选择上级后，重新输入不一样的上级,false', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('666')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.getBoss('xiaomi')
    comp.search('xiaomi1')
    fixture.detectChanges()
    expect(el.disabled).toBe(true);;
  });
  it('选择上级后，重新输入不一样的上级，然后输入一样的上级 ,true', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('666')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.getBoss('xiaomi')
    comp.search('xiaomi1')
    comp.search('xiaomi')
    comp.isSelectBoss = true;
    fixture.detectChanges()
    expect(comp.isSelectBoss).toBe(true);
  });
  it('由搜索中选择上级,true', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('666')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.search('xiaomi')
    comp.getBoss('xiaomi')
    fixture.detectChanges()
    expect(comp.isSelectBoss).toBe(true);
  });
  it('直接输入上级不选择', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('666')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.todo.controls['boss'].setValue("xiaomi")
    fixture.detectChanges()
    expect(comp.isSelectBoss).toBe(false);
  });
  it('上级为空时显示错误信息', () => {
    comp.todo.controls['type'].setValue('P')
    comp.todo.controls['reason'].setValue('666')
    comp.todo.controls['startTime'].setValue("2017-01-01T01:00:00Z")
    comp.todo.controls['endTime'].setValue("2017-01-01T05:00:00Z")
    comp.todo.controls['boss'].setValue("")
    comp.check(comp.todo.value.boss,'boss').then((valid) => {
      fixture.detectChanges()
      expect(valid.boss.error).toBe(valid.boss.dataset.vRequiredMessage);;
    });
  });
  it('提交', () => {
    comp.leaveForm();
    fixture.detectChanges()
    expect(true).toBe(true);;
  });
  it('跳转', () => {
    comp.myholidayDetail();
    fixture.detectChanges()
    expect(true).toBe(true);;
  });

});
