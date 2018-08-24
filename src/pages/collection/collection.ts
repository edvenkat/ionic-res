import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestaurantService } from '../../providers/restaurant-service';
import { SearchResult } from '../searchresult/searchresult';
@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html'
})
export class Collection {
  restaurantsCollection: Array<any>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public restaurantService: RestaurantService) {    
  }
  ionViewWillEnter() {  
    this.getRestaurantCollection();
  }
  getRestaurantCollection(infiniteScroll?: any) {    
    this.restaurantService.getRestaurantCollection()
      .subscribe(res => {   
        this.restaurantsCollection=res.collections;
        console.log(this.restaurantsCollection)
      });
  }
  showResDetails(collectionId) {
     var collection = {"collection_id":collectionId}
     this.navCtrl.push(SearchResult, collection);
  }
}