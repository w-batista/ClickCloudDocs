import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DocSharedProvider {
    private selectedDoc:BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public getSelectedPerson() {
        return this.selectedDoc.asObservable();
    }

    public docEmitter(value) {
      this.selectedDoc.next(value);
    }

}
