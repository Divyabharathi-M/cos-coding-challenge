import { TranslateService } from '@ngx-translate/core';
import { BuyerAuctionDisplayModel } from './../../models/buyer-auction.model';
import { AuctionService } from './../../services/auction.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BuyerAuctionsResponse } from 'src/app/models/buyer-auction.model';
import { interval, Subscription } from 'rxjs';
import { IonRouterOutlet } from '@ionic/angular';
import { FuelType, Transmission } from 'src/app/models/common.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnDestroy, OnInit {
  loaded = false;
  errorMessage = '';
  cannotFindResults = false;
  buyerAuctionList: BuyerAuctionDisplayModel[] = [];
  buyerAuctionResp!: BuyerAuctionsResponse;
  fakeAuctions = ['', '', '', '', '', '', '', '', '', '', '', ''];
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  noAuctionAvailable='ERRORS.no_auction_available';
  somethinWentWrong='ERRORS.something_went_wrong';
  fueltype = FuelType;
  transmission = Transmission;

  auctionSubscription!: Subscription;
  refreshSubscription!: Subscription;
  msgSubscription!: Subscription;

  constructor(private auctionService: AuctionService,
    private routerOutlet: IonRouterOutlet,
    private translateService: TranslateService,
    ) {}

  ngOnInit(): void {
    this.getAuction();
    // this.refreshData(); 
  }
  ionViewDidEnter(){
    this.routerOutlet.swipeGesture = false;
  }
  getAuction() {
    this.auctionSubscription = this.auctionService.getAuctionsForBuyer().subscribe((resp: BuyerAuctionsResponse) => {
      if(resp && resp.items) {
        this.buyerAuctionResp = resp;
        resp.items.forEach((item, ind, arr) => {
          this.buyerAuctionList.push(this.buildData(item));
          if(ind === arr.length - 1) {
            this.loaded = true;
          }
        })
      } else {
        this.loaded = true;
        this.errorMessage = this.getErrorMsg(this.noAuctionAvailable);
        this.cannotFindResults = true;
      }
    }, (err) => {
      this.loaded = true;
      this.errorMessage = this.getErrorMsg(this.somethinWentWrong);
      this.cannotFindResults = true;
    })
  }

  refreshData() {
    this.refreshSubscription = interval(20000).subscribe(() => {
      this.getAuction();
    });
  }

  buildData(item: any): BuyerAuctionDisplayModel {
    return {
      id: item.id,
      label: item.label,
      ez: item.associatedVehicle.ez,
      transmission: item.associatedVehicle.transmission,
      fuelType: item.associatedVehicle.fuelType,
      mileageInKm: item.associatedVehicle.mileageInKm.toLocaleString('de-DE'),
      currentHighestBidValue: item.currentHighestBidValue.toLocaleString('de-DE', {
        style: 'currency', 
        currency: 'EUR', 
        minimumFractionDigits: 2 
    }),
      remainingTimeInSeconds: item.remainingTimeInSeconds,
      amIHighestBidder: item.amIHighestBidder,
      vehicleImages: item.associatedVehicle.vehicleImages
    } 
  }

  getErrorMsg(error: string) {
    let msg = '';
    this.msgSubscription =  this.translateService.get(error).subscribe(
      value => {
        msg = value;
      }
    )
    return msg;
  }

  ngOnDestroy(): void {
    this.auctionSubscription.unsubscribe();
    this.refreshSubscription.unsubscribe();
    this.msgSubscription.unsubscribe();
  }
}
