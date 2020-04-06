import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/services/my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sse';
  constructor(private _myService: MyServiceService) {}
  ngOnInit() {
    const url = 'http://127.0.0.1:3000/process'
    this._myService.getData(url)
    .subscribe(data => console.log(data));
  }
}
