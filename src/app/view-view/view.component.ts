import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router, NavigationEnd } from '@angular/router';
import { routerTransition } from '../router.animations';
@Component({
  selector: 'app-view',
  animations: [ routerTransition ],
  templateUrl: '../shared/standard-secondary-route/standard-secondary-route.html',
  styleUrls: ['../shared/standard-secondary-route/standard-secondary-route.css']
})
export class ViewComponent implements OnInit {

  routeLinks = [
    {label: 'Usage' , link: 'usage'},
    {label: 'Breakages' , link: 'issue'},
    {label: 'Fixed' , link: 'fixed'}
  ];
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  router: Router;
  constructor(private _router: Router ) {
    this.router = _router;
  }

  ngOnInit() {}

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    const str = this.router.url;
    const tokens = str.split('/').slice(1);
    const url = tokens[1];

    const pos: any = this.routeLinks.filter((item) => {if (item.link === url) {return item; } });
    const currentIndex: number = this.routeLinks.indexOf(pos[0]);

    if (currentIndex > this.routeLinks.length || currentIndex < 0) { return; }
    let nextIndex = 0;
    // next
    if (action === this.SWIPE_ACTION.RIGHT) {
      nextIndex = currentIndex - 1;
    }

    // previous
    if (action === this.SWIPE_ACTION.LEFT) {
      nextIndex = currentIndex + 1;
    }
    if (nextIndex >= 0 && nextIndex < this.routeLinks.length && nextIndex !== currentIndex) {
      this.router.navigate([tokens[0], this.routeLinks[nextIndex].link]);
    }
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
