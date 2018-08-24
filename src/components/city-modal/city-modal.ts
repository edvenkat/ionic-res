import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ToastController } from 'ionic-angular';
import { RestaurantService } from '../../providers/restaurant-service';
import { Keyboard } from 'ionic-native';
import { FormGroup,FormControl} from '@angular/forms';
/*
  Generated class for the ImageModal component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'city-modal',
  templateUrl: 'city-modal.html'
})
export class CityModal {
	searchTerm: string = '';
	city : Array<any> = new Array(0);
	constructor(public navCtrl: NavController,
				public navParams: NavParams, 
				public restaurantService: RestaurantService,
				public viewCtrl: ViewController,
				public toastCtrl: ToastController) {    
	}
	getRestaurantsCity() {    
		Keyboard.close();
		this.restaurantService.getRestaurantCity(this.searchTerm)
		.subscribe(res => {   
				this.city=res.location_suggestions;
				console.log(this.city)
		});
	}
	citySelected(cityId:string) {
		console.log("citySelected");
		localStorage.setItem("cityId",cityId);
		console.log("cityValue"+ localStorage.getItem("cityId"));
		this.viewCtrl.dismiss();
		const toast = this.toastCtrl.create({
			message: 'Your city were successfully saved',
			duration: 3000
		});
		toast.present();
	}
}