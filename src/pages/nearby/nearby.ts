import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import { RestaurantService } from '../../providers/restaurant-service';
import { Details } from '../details/details';

@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html'
})
export class Nearby {

  restaurants: Array<any>;
  searchTerms: Array<any>;

  constructor(public navCtrl: NavController, public restaurantService: RestaurantService,public loadingCtrl: LoadingController) {}

  ionViewWillEnter() {
    this.restaurantService.showInterstitialAd()
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
     loader.present();
    this.restaurantService.getRestaurants().subscribe((data) => { 
        //console.log("Data Start");
        //console.log(data);
        //console.log("Data End");
        this.restaurants = data.nearby_restaurants; 
       loader.dismiss();
        //console.log(this.restaurants);
    },
    err => {
        console.log(err);
    },
    () => console.log('Restaurants Search Complete')
    );
    //

  }

  showDetails(details: Object) {
   // console.log(details)
    this.navCtrl.push(Details, details);
  }

}
