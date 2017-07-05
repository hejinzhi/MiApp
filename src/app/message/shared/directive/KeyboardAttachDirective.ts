import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { Content, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { Subscription } from 'rxjs/rx';


/**
 * @name KeyboardAttachDirective
 * @description
 * The `keyboardAttach` directive will cause an element to float above the
 * keyboard when the keyboard shows. Currently only supports the `ion-footer` element.
 *
 * ### Notes
 * - This directive requires [Ionic Native](https://github.com/driftyco/ionic-native)
 * and the [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugin-keyboard).
 * - Currently only tested to work on iOS.
 * - If there is an input in your footer, you will need to set
 *   `Keyboard.disableScroll(true)`.
 *
 * @usage
 *
 * ```html
 * <ion-content #content>
 * </ion-content>
 *
 * <ion-footer [keyboardAttach]="content">
 *   <ion-toolbar>
 *     <ion-item>
 *       <ion-input></ion-input>
 *     </ion-item>
 *   </ion-toolbar>
 * </ion-footer>
 * ```
 */

@Directive({
    selector: '[keyboardAttach]'
})
export class KeyboardAttachDirective implements OnDestroy {
    @Input() content: Content;

    private onShowSubscription: Subscription;
    private onHideSubscription: Subscription;

    private attachTime = 0;

    constructor(
        private elementRef: ElementRef,
        private platform: Platform,
        private keyboard: Keyboard
    ) {
        if (this.platform.is('cordova') && this.platform.is('ios')) {
            this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe(e => this.onShow(e));
            this.onHideSubscription = this.keyboard.onKeyboardHide().subscribe(() => this.onHide());
        }
    }

    ngOnDestroy() {
        if (this.onShowSubscription) {
            this.onShowSubscription.unsubscribe();
        }
        if (this.onHideSubscription) {
            this.onHideSubscription.unsubscribe();
        }
    }

    private onShow(e: any) {
        let keyboardHeight: number = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
        if (this.attachTime > 1) {
            if (
                keyboardHeight == 313 ||
                keyboardHeight == 258 ||
                keyboardHeight == 216 ||
                keyboardHeight == 253 ||
                keyboardHeight == 226 ||
                keyboardHeight == 271 ||
                keyboardHeight == 216 ||
                keyboardHeight == 264) {
                this.setElementPosition(0)
            } else {
                if (this.attachTime > 2) {
                    this.setElementPosition(0)
                } else {
                    this.setElementPosition(keyboardHeight);
                }
            }
        } else {
            this.setElementPosition(keyboardHeight);
        }
        this.attachTime++
        // this.setElementPosition(keyboardHeight)
    };

    private onHide() {
        this.setElementPosition(0);
        this.attachTime = 0
    };

    private setElementPosition(pixels: number) {
        let that = this;
        console.log('scroll ' + pixels);
        this.elementRef.nativeElement.style.paddingBottom = pixels + 'px';
        this.content.getScrollElement().style.marginBottom = (pixels + 44) + 'px';
        setTimeout(function () {
            that.content.scrollToBottom()
        }, 10);

    }
}