import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestaurantService } from '../../providers/restaurant-service';
import { Keyboard } from 'ionic-native';
import { Details } from '../details/details';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class Search {
	restaurants: Array<any>;
	searchTerm: string = '';
	startIndex: any = 0;
	constructor(public navCtrl: NavController,
				public navParams: NavParams, 
				public restaurantService: RestaurantService) {    
	}
	ionViewWillEnter() {  
		this.getRestaurants();
	}
	getRestaurants(infiniteScroll?: any) {    
		if (infiniteScroll) {
			this.startIndex = this.startIndex + 10;
		} else {
			this.startIndex = 0;
			this.restaurants = [];
		}
		Keyboard.close();
		this.restaurantService.getRestaurantBySearch(this.searchTerm,this.startIndex)
		.subscribe(res => {   
			for (let i = 0; i < 10; i++) {
				this.restaurants.push(res.restaurants[i]);
			}
            console.log(this.restaurants)
			if (infiniteScroll) {
				infiniteScroll.complete();
			}
		});
	}
	showDetails(details: Object) {
		this.navCtrl.push(Details, details);
	}
}