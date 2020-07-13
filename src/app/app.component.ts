import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'phani-app';
  data: Data;
  mData: Data;
  responseStep1: any;
  responseStep4: any;

  ngOnInit() {
      // Initial data

    this.data = {
      development: [
        {
          exchangeIds: [1],
          nodeCode: 'string',
        },
      ],
      production: [
        {
          exchangeIds: [0],
          nodeCode: 'string',
        },
      ],
      statusKey: '',
      training: [
        {
          exchangeIds: [0],
          nodeCode: 'string',
        },
      ],
      trial: [
        {
          exchangeIds: [0],
          nodeCode: 'string',
        },
      ],
    };

    // Step 1 - API call to get Key

    this.responseStep1 = {
    key: 'C8368630.038424795455389016'
  };

    // Step2 - update status key in data
    this.mData = this.data;

    this.updateKey(this.responseStep1);

   // Step3: post call and only respond on error -- Input:  mData


   // Step4 : GET call using the key -- this.mData['statusKey']

    this.responseStep4  = {
      deployId: 'C8368630.3211117679130807',
      completedCount: 4,
      totalCount: 4,
      statusMap: {
        '0|Trial|string|Physical_Exchange': {
          statusDetailsKey: '0|Trial|string|Physical_Exchange',
          entityId: 0,
          percentageComplete: 0,
          responseText: 'No physical exchange found for id=0 StatusKey=C8368630.3211117679130807',
          status: false,
          entityType: 'Physical_Exchange'
        },
        '0|Production|string|Physical_Exchange': {
          statusDetailsKey: '0|Production|string|Physical_Exchange',
          entityId: 0,
          percentageComplete: 0,
          responseText: 'No physical exchange found for id=0 StatusKey=C8368630.3211117679130807',
          status: false,
          entityType: 'Physical_Exchange'
        },
        '0|Training|string|Physical_Exchange': {
          statusDetailsKey: '0|Training|string|Physical_Exchange',
          entityId: 0,
          percentageComplete: 50,
          responseText: 'No physical exchange found for id=0 StatusKey=C8368630.3211117679130807',
          status: true,
          entityType: 'Physical_Exchange'
        },
        '1|Development|string|Physical_Exchange': {
          statusDetailsKey: '1|Development|string|Physical_Exchange',
          entityId: 1,
          percentageComplete: 100,
          responseText: `Error connecting to B2Bi. Message = Error getting all application pickups.  B2B error code=null Error=B2BI
                        internal server error. Contact b2bi oncall`,
          status: false,
          entityType: 'Physical_Exchange'
        }
      }
    };

    // TODO: Set Timeout for 6 secs and call again if status is true and percentageComplete < 100

    const temp = Object.values(this.responseStep4.statusMap);
    temp.map( x => {
      // tslint:disable-next-line:no-string-literal
      if ( x['status'] && x['percentageComplete']) {
        setTimeout(this.getUpdatedStatus, 6000);
      }
    });
  }

  getUpdatedStatus() {
    // TODO: Call the step4 status call again for updated data
    // progress bar will be updated automatically - responseStep4 should be updated
    console.log('check update call');
  }

  updateKey(responseStep1) {
    this.mData.statusKey = responseStep1.key;
  }


}

export interface Data {
  statusKey: any;
  development: any;
  production: any;
  training: any;
  trial: any;
}
