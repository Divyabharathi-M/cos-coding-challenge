import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { LoginPageComponent } from './login.page';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      providers: [IonicModule.forRoot(),
        IonicStorageModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
