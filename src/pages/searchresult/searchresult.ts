import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestaurantService } from '../../providers/restaurant-service';
import { Keyboard } from 'ionic-native';
import { Details } from '../details/details';
import { DefaultImage } from '../../../../app/not.found'
@Component({
  selector: 'page-searchresult',
  templateUrl: 'searchresult.html'
})
export class SearchResult {
	restaurants: Array<any> = new Array(0);
	searchTerm: string = '';
	resStartIndex : any = 0;
	totalResCount : any = 0;
	currentResCount : any = 0;
    ajaxDone = false;
	constructor(public navCtrl: NavController,
				public navParams: NavParams, 
				public restaurantService: RestaurantService,public loadingCtrl: LoadingController) {    
	}
	ionViewWillEnter() {  
		this.getRestaurants();
	}
	getRestaurants(infiniteScroll?: any) {
		console.log(this.navParams.data)
		if (infiniteScroll) {
			this.resStartIndex = this.resStartIndex + 10;
		} else {
			this.resStartIndex = 0;
			this.restaurants = [];
		}
		Keyboard.close();
		// var filterObject = {"collection_id":this.navParams.data}
		var filterObject = this.navParams.data;
		const loadersr = this.loadingCtrl.create({
			content: "Please wait..."
		});
		loadersr.present();
        this.ajaxDone = false;
		this.restaurantService.getRestaurantBySearch(filterObject,this.resStartIndex)
		.subscribe(res => {  
			loadersr.dismiss();
            this.ajaxDone = true;
			this.totalResCount = res.results_found;
			this.currentResCount = res.results_shown;
			this.resStartIndex = res.results_start;
			if(this.currentResCount>=this.totalResCount) {
				this.resStartIndex = this.currentResCount;
			}
			for (let i = 0; i < this.currentResCount; i++) {
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