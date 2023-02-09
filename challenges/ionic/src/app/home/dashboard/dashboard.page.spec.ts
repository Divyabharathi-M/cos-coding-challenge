import { TranslateService } from '@ngx-translate/core';
import { BuyerAuctionsResponse } from './../../models/buyer-auction.model';
import { AuctionService } from './../../services/auction.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, IonicRouteStrategy, IonRouterOutlet } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { of } from 'rxjs/internal/observable/of';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {
    const auctionServiceSpy = jasmine.createSpyObj<AuctionService>(['getAuctionsForBuyer']);
    const buyerAuctionsResponse: BuyerAuctionsResponse = { 
      "items": [
      {
        "id": 25048,
        "label": "Chevrolet 8C",
        "associatedVehicle": {
          "ez": "02/1994",
          "transmission": 1,
          "fuelType": 4,
          "mileageInKm": 30050,
          "vehicleImages": [
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/0_nqua3q.jpg",
                "perspective": 0
            },
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/1_ngrw2h.jpg",
                "perspective": 1
            },
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/2_lcgbtp.jpg",
                "perspective": 2
            },
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/3_s49mn1.jpg",
                "perspective": 3
            },
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/4_ei3khg.jpg",
                "perspective": 4
            },
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/5_zltdum.jpg",
                "perspective": 5
            },
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/6_k9pvgb.jpg",
                "perspective": 6
            },
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/7_k55yud.jpg",
                "perspective": 7
            },
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/8_thh267.jpg",
                "perspective": 8
            },
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/9_ufgk6t.jpg",
                "perspective": 9
            },
            {
                "url": "https://res.cloudinary.com/castle-tech-gmbh-dev/image/upload/test-data/10_p2whem.jpg",
                "perspective": 10
            }
        ]
        },
        "currentHighestBidValue": 2926722,
        "remainingTimeInSeconds": 36186,
        "amIHighestBidder": false,
      }
    ],
    "page": 1,
    "total": 10
    }

    auctionServiceSpy.getAuctionsForBuyer.and.returnValue(of(buyerAuctionsResponse))

    const translateServiceSpy = jasmine.createSpyObj<any>(['get']); 
    translateServiceSpy.get.and.returnValue(of('Error Msg'))

    // const ionRouterOutletSpy = jasmine.createSpyObj(['swipeGesture']);

    await TestBed.configureTestingModule({
      declarations: [DashboardPage],
      providers: [IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        {provide: AuctionService, useValue: auctionServiceSpy},
      {provide: TranslateService, useValue: translateServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
