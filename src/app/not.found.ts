import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[imgSrc]',
    host: {
        '[src]': 'checkPath(src)',
        '(error)': 'onError()'
    }
})
export class DefaultImage { 
    @Input() src: string;
	@Input() defaultImg: string;
    //public defaultImg: string = '';
	
    private defaultImg(color: defImg) {
		this.defaultImg = defImg;
	}
    public onError() {
        return this.defaultImg;
    }
    public checkPath(src) {
        return src ? src : this.defaultImg;
    }
}