import { Component, OnInit } from '@angular/core';
import { NavItem } from '../shared/model/nav-item.model';

const NAV_ITEM_LIST = [
  new NavItem("Home", "home"),
  new NavItem("About", "about"),
]

@Component({
  selector: 'app-navbar',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class NavBarComponent implements OnInit {

  public navItemsList: NavItem[] = [];

  constructor() {
    this.navItemsList.push(...NAV_ITEM_LIST);
  }

  ngOnInit() {
  }
}
