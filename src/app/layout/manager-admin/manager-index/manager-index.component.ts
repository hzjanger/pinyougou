import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-index',
  templateUrl: './manager-index.component.html',
  styleUrls: ['./manager-index.component.scss']
})
export class ManagerIndexComponent implements OnInit {
  isCollapsed = false;

  constructor() { }

  ngOnInit() {
  }

}
