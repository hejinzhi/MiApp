import { NavController } from 'ionic-angular';
import { BookLibraryComponent } from '../../application/my-modules/book-library/book-library.component';

export class MyRouter {
    constructor() { }

    public go(navCtrl: NavController, id: number): void {
        switch (id) {

            case 1:
                navCtrl.push(BookLibraryComponent);
                break;
            default:
                break;
        }

    }

}
