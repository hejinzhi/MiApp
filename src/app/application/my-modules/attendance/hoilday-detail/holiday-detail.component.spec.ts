import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { App, Config, Form, IonicModule, Keyboard, DomController, MenuController, NavController, Platform, NavParams, GestureController } from 'ionic-angular';
import { HoildayDetailComponent } from './holiday-detail.component';
import { ConfigMock, PlatformMock, NavMock } from '../../../../../mocks';

describe('HoildayDetailComponent', () => {

  let comp: HoildayDetailComponent;
  let fixture: ComponentFixture<HoildayDetailComponent>;
  let de: DebugElement;
  let el: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HoildayDetailComponent], // declare the test component
      providers: [
        App, DomController, Form, Keyboard, NavController, GestureController,
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavMock }
      ],
      imports: [
        IonicModule,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HoildayDetailComponent);
    comp = fixture.componentInstance; // BannerComponent test instance
    fixture.detectChanges();
  }));
  it('载入,第一个图显示', () => {
    comp.ionViewDidLoad();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#main'));
    el = de.nativeElement;
    console.log(de)
    expect(el.children.length).toBe(2);;
  });
  it('载入,第二个图显示', () => {
    comp.ionViewDidLoad();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#main2'));
    el = de.nativeElement;
    console.log(de)
    expect(el.children.length).toBe(2);;
  });
});
