import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
@Component({
  selector: 'image-modal',
  templateUrl: 'image-modal.html'
})
export class ImageModal {
	photos: Array<any>;
	name: string;
	slideOptions: any;
	constructor(params: NavParams) {
		this.photos = params.data.photos;
		this.name = params.data.name;
		this.slideOptions = {
			initialSlide: params.data.startIndex,
			loop: true
		}
	}
}