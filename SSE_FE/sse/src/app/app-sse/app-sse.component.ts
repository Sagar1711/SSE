import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MyServiceService } from 'src/services/my-service.service';

@Component({
  selector: 'app-app-sse',
  templateUrl: './app-sse.component.html',
  styleUrls: ['./app-sse.component.scss']
})
export class AppSseComponent implements OnInit, AfterViewInit {

  updated_process: object;
  processes: any;

  constructor(private _myService: MyServiceService) { }

  ngOnInit(): void {
    // const url = 'http://127.0.0.1:3000/process'
    // this._myService.getData(url)
    // .subscribe(data => {
    //   this.processes = data["result"];
    // });
  }

  ngAfterViewInit(): void {
    const url = 'http://127.0.0.1:4000/my-endpoint'
    this._myService.getServerSentEvents(url).subscribe(
      (data) => {
        this.updated_process = JSON.parse(data['data']);
        console.log(data['data']);
      },
      (error) => {
        console.log('++++Error++++');
        console.log(error);
      }
    );
  }

}
