import { Component, OnInit, Input, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

// tslint:disable-next-line:variable-name
_pbData: any;
get pbData(): any {
    return this._pbData;
}

@Input('pbData')
set pbData(value: any) {
    this._pbData = value;
    this.updateProgressBar(value);
}

finalData: any;

  constructor() { }

  ngOnInit(): void {
  }
  updateProgressBar(data: any ) {
    // console.log(Object.values(data));
    this.finalData = Object.values(data);

  }

  setType(pb: any) {
    // console.log(pb);

    // TODO: based on the value can update the progress bar type/color
    // tslint:disable-next-line:no-string-literal
    if (!pb['status']) {
      return 'danger';
    }

    return 'success';
  }

}
