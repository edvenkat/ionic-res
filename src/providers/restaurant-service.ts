import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Geolocation } from 'ionic-native';
import { AdMobPro } from '@ionic-native/admob-pro';
/*
  Generated class for the RestaurantService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestaurantService {
  
  searchTerm: string = 'Restaurants';

  constructor(public http: Http, 
              public platform: Platform,public admob: AdMobPro) {
    platform.ready().then(() => {
            var admobid = {
                banner: 'ca-app-pub-3940256099942544/6300978111',
                interstitial: 'ca-app-pub-7957971173858308/5667703151'
            };

            this.admob.createBanner({
                adId: admobid.banner,
                isTesting: true,
                autoShow: true,
                position: this.admob.AD_POSITION.BOTTOM_CENTER
            })

            this.admob.prepareInterstitial({
                adId: admobid.interstitial,
                isTesting: true,
                autoShow: false
            })
        });
    }
  
  
   showInterstitialAd() {
      if (AdMobPro) {
            this.admob.showInterstitial();
        }
    }
  

  getRestaurants(searchTerm: string = 'Restaurant'): Observable<any> {
    return new Observable(observer => {
      this.platform.ready().then(
        () => Geolocation.getCurrentPosition().then(
          location => this.apiRequest(searchTerm, location).subscribe(
            res => {
              observer.next(res);
              observer.complete();
            }
          )                     
        )
      )
    })
  }


  apiRequest(searchTerm: string, location?: Object): Observable<any> {    
    let url = 'https://developers.zomato.com/api/v2.1/geocode';
    let query = `?lat=${location['coords']['latitude']}&long=${location['coords']['longitude']}`;    
    //https://developers.zomato.com/api/v2.1/geocode?lat=13.0410392&lon=80.2376969
    
    let opt: RequestOptions
    var headers = new Headers();
    headers.append('Accept', 'application/json ');
    headers.append('user-key', 'b1d0e4b57caefbdf2992987044c48c07');
    
    
    opt = new RequestOptions({
     headers: headers
    })   
    
    //
    var response = this.http.get(url + query,opt)
    .map((res : Response) => res.json())
    return response;
    //
    
    
    /*
    var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI("abc") + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
    var response = this.http.get(url).map(res => res.json());
    return response;
    */

  }

  getArray(size): Array<any> {
    if(size==0) {
        return new Array(0);
    } else {
        return new Array(Math.ceil(size));
    }
    
  }
  
  getRestaurantBySearch(filter:any,startIndex:String): Observable<any> {
   // https://developers.zomato.com/api/v2.1/search?q=T%20nagar
    
    var searchString = "";
    console.log(filter)
    if((filter.hasOwnProperty("collection_id") ? true : false)) {
        searchString = "&collection_id="+filter["collection_id"];
    }
    if((filter.hasOwnProperty("establishment_type") ? true : false)) {
        searchString = "&establishment_type="+filter["establishment_type"];
    }
    
    
    let url = 'https://developers.zomato.com/api/v2.1/search';
    let query = '?entity_type=city&entity_id='+localStorage.getItem("cityId")+'&start='+startIndex+'&count=10'+searchString;    

     let opt: RequestOptions
     var headers = new Headers();
     headers.append('Accept', 'application/json ');
     headers.append('user-key', 'b1d0e4b57caefbdf2992987044c48c07');
     opt = new RequestOptions({
        headers: headers
     })
    
     //
     var response = this.http.get(url + query,opt)
     .map((res : Response) => res.json())

    return response;
  
  }
  
  getRestaurantReview(restaurantId: string): Observable<any> {
     let url = 'https://developers.zomato.com/api/v2.1/reviews';
     console.log("restaurantId")
     console.log(restaurantId)
     let query = '?res_id='+restaurantId;    
     //https://developers.zomato.com/api/v2.1/reviews?res_id=2100702

     let opt: RequestOptions
     var headers = new Headers();
     headers.append('Accept', 'application/json ');
     headers.append('user-key', 'b1d0e4b57caefbdf2992987044c48c07');
     opt = new RequestOptions({
        headers: headers
     })   

        
     //
     var response = this.http.get(url + query,opt)
     .map((res : Response) => res.json())

    return response;
  }
 
  getRestaurantCity(city: string): Observable<any> {
     let url = 'https://developers.zomato.com/api/v2.1/cities';
     let query = '?q='+city;    
     
     let opt: RequestOptions
     var headers = new Headers();
     headers.append('Accept', 'application/json ');
     headers.append('user-key', 'b1d0e4b57caefbdf2992987044c48c07');
     opt = new RequestOptions({
        headers: headers
     })   

        
     //
     var response = this.http.get(url + query,opt)
     .map((res : Response) => res.json())

    return response;
  }

   getRestaurantCollection(): Observable<any> {
    //https://developers.zomato.com/api/v2.1/collections?city_id=1&count=50
    
     let url = 'https://developers.zomato.com/api/v2.1/collections';
     let query = '?city_id='+localStorage.getItem("cityId");
     
     let opt: RequestOptions
     var headers = new Headers();
     headers.append('Accept', 'application/json ');
     headers.append('user-key', 'b1d0e4b57caefbdf2992987044c48c07');
     opt = new RequestOptions({
        headers: headers
     })   

        
     //
     var response = this.http.get(url + query,opt)
     .map((res : Response) => res.json())

    return response;
  }
   getRestaurantType(): Observable<any> {
     
     let url = 'https://developers.zomato.com/api/v2.1/establishments';
     let query = '?city_id='+localStorage.getItem("cityId");
     
     let opt: RequestOptions
     var headers = new Headers();
     headers.append('Accept', 'application/json ');
     headers.append('user-key', 'b1d0e4b57caefbdf2992987044c48c07');
     opt = new RequestOptions({
        headers: headers
     })   

        
     //
     var response = this.http.get(url + query,opt)
     .map((res : Response) => res.json())

    return response;
  }

}
