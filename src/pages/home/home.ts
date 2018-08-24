import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Nearby } from '../nearby/nearby';
import { Search } from '../search/search';
import { ModalController } from 'ionic-angular';
import { CityModal } from '../../components/city-modal/city-modal';
import { Collection } from '../collection/collection';
import { RestaurantsType } from '../restauranttype/restauranttype';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    nearbyRoot: any = Nearby;
    searchRoot: any = Search;
    
	constructor(public navCtrl: NavController,public modalCtrl: ModalController) {
		if(localStorage.getItem("cityId")==undefined || localStorage.getItem("cityId")=="")
			this.showCityModal();
	}
	resSearch(type:string) {
		if(type=="nearby") {
			this.navCtrl.push(Nearby);
		}
		if(type=="collection") {
			this.navCtrl.push(Collection);
		}
		if(type=="restype") {
			this.navCtrl.push(RestaurantsType);
		}
	}
	showCityModal() {
		const modal = this.modalCtrl.create(CityModal);
		modal.present();
	}
}
