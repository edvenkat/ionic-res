import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Review } from '../../components/review/review';
import { RestaurantService } from '../../providers/restaurant-service';
import { ImageModal } from '../../components/image-modal/image-modal';
import { Device } from '@ionic-native/device';
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class Details {
	restaurant: any;
	restaurantReview : Array<any> = new Array(0);
	restaurantPhotos : Array<any> = new Array(0);
	stars: Array<any> = new Array(5);
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public modalCtrl: ModalController,
				private device: Device, 
				public restaurantService: RestaurantService) {
		this.restaurant = this.navParams.data;
		this.shortenName();
		let restaurantId =  this.restaurant.restaurant.id;
		this.restaurantService.getRestaurantReview(restaurantId)
		.subscribe(res => {
			this.restaurantReview = res.user_reviews;
			console.log(this.restaurantReview);
        },err => {
			console.log(err);
        },() => console.log('Restaurants Search Complete'));
		this.restaurantPhotos.push({"thumbnail":this.restaurant.restaurant.thumb})
		this.restaurantPhotos.push({"thumbnail":this.restaurant.restaurant.featured_image})
	}
	showImage(name: string, photos: Array<any>, startIndex: number) {
		let imgModal = this.modalCtrl.create(ImageModal, {name: this.restaurant.shortname, photos: photos, startIndex: startIndex});
		imgModal.present();
	}
	shortenName() {
		let name = this.restaurant.restaurant.name;
		if (name.length > 20) {
			name = name.slice(0, 19) + '...';       
		}
		this.restaurant.shortname = name;
	}
	isActive(index: number) {
		//console.log(Math.ceil(this.restaurant.restaurant.user_rating.aggregate_rating));
		//console.log(index);
		//console.log(Math.ceil(this.restaurant.restaurant.user_rating.aggregate_rating)>=index);
		if (Math.ceil(this.restaurant.restaurant.user_rating.aggregate_rating) >= index) {
			return true;
		}
		return false;
	}
	visitBookURL(book_url) {
		window.open(book_url, '_system')
	}
	googleMap(restaurantName,lat,long) {
		/* var platform = this.device.platform.toLowerCase();
		console.log("platform");
		console.log(platform);
		var scheme ="";
		if(platform == "android") {
			scheme = 'com.google.android.apps.maps';
		} else if(platform == "ios") {
			scheme = 'maps://';
		} */
		var addressLongLat =  lat+','+long;
		window.open("http://maps.google.com/?q="+restaurantName+'@'+addressLongLat, '_system');
		/*
		appAvailability.check(scheme,function() {
            if(platform == "android") {
                window.open("geo:"+addressLongLat+"?q="+restaurantName+'@'+addressLongLat, "_system");
            } 
        },function() {
            window.open("http://maps.google.com/?q="+addressLongLat, '_system');
        });
		*/
	}
}
