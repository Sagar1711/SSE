import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MyServiceService } from 'src/services/my-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { SocketService } from 'src/services/socket/socket.service';

@Component({
  selector: 'app-app-sse',
  templateUrl: './app-sse.component.html',
  styleUrls: ['./app-sse.component.scss']
})
export class AppSseComponent implements OnInit, AfterViewInit {

  updated_process: object;
  // processes: any;
  // errorComponent: any[];
  processes: object[];

  constructor(
    private _myService: MyServiceService,
    private ref: ChangeDetectorRef, 
    private _socketService: SocketService
  ) {
    this.processes = [
      {name: 'process_a', status: 'open'},
      {name: 'process_b', status: 'open'},
      {name: 'process_c', status: 'open'}
    ];
    // this._socketService.sendMessage("Helo");
  }

  ngOnInit(): void {
    this._socketService.getMessages().subscribe(
      (data) => console.log(">>", data),
      (error) => console.log(">>>", error)
    );
  }

  ngAfterViewInit(): void {
    // const url = 'http://127.0.0.1:3000/push';
    // this._myService.getServerSentEvents(url).subscribe(
    //   (data) => {
    //     this.updated_process = JSON.parse(data['data']);
    //     console.log(data['data']);
    //     this.processes.forEach(process => {
    //       if (process['name'] === this.updated_process['name']) {
    //         process['status'] = this.updated_process['status'];
    //       }
    //     });
    //     console.log(this.processes);
    //     this.ref.detectChanges();
    //   },
    //   (error) => {
    //     // this.errorComponent.push(error);
    //     this.handleError(error);
    //     console.log('++++Error++++');
    //     console.log(error);
    //   }
    // );
  }

  handleError(error) {
    console.log(error);
  }

}
