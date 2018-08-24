import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestaurantService } from '../../providers/restaurant-service';
import { SearchResult } from '../searchresult/searchresult';
@Component({
  selector: 'page-restauranttype',
  templateUrl: 'restauranttype.html'
})
export class RestaurantsType {
	restaurantsType: Array<any>;
	constructor(public navCtrl: NavController,
				public navParams: NavParams, 
				public restaurantService: RestaurantService) {    
	}
	ionViewWillEnter() {  
		this.getRestaurantType();
	}
	getRestaurantType(infiniteScroll?: any) {    
		this.restaurantService.getRestaurantType()
		.subscribe(res => {   
			this.restaurantsType=res.establishments;
			console.log(this.restaurantsType)
		});
	}
	showResDetails(establishmentType) {
		var establishment = {"establishment_type":establishmentType}
		this.navCtrl.push(SearchResult, establishment);
	}
}