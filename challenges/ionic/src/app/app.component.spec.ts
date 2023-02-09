import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { HttpLoaderFactory } from './app.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

const authenticationState = new BehaviorSubject(false)

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ReactiveFormsModule,
      ],
      providers: [AuthenticationService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should define initialise app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.initialiseApp).toBeDefined();
  });

  it('authentication state should be false', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.showLogOut).toBeFalse;
  });

});
