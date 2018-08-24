import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Device } from '@ionic-native/device';
import { AdMobPro } from '@ionic-native/admob-pro';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Search } from '../pages/search/search';
import { Nearby } from '../pages/nearby/nearby';
import { Details } from '../pages/details/details';
import { Collection } from '../pages/collection/collection';
import { SearchResult } from '../pages/searchresult/searchresult';
import { RestaurantsType } from '../pages/restauranttype/restauranttype';

import { Review } from '../components/review/review';
import { ImageModal } from '../components/image-modal/image-modal';
import { CityModal } from '../components/city-modal/city-modal';

import { DefaultImage } from './not.found'


import { RestaurantService } from '../providers/restaurant-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Search,
    Nearby,
    Details,
    Review,
    ImageModal,
    CityModal,
    Collection,
    SearchResult,
    RestaurantsType,
    DefaultImage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Search,
    Nearby,
    Details,
    ImageModal,
    CityModal,
    Collection,
    SearchResult,
    RestaurantsType
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    AdMobPro,
    RestaurantService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
