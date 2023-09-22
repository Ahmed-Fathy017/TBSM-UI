import { Component, Input, OnInit } from '@angular/core';
import { INavbarData } from '../../models/helper';
import { animate, state, style, transition, trigger } from '@angular/animations';
// removed collapsed flag from ul
@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf=" data.items && data.items.length > 0 && data.showInMenu"
      [@submenu]="expanded
        ? {value: 'visible', 
          params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)',height: '*'}} 
        : {value: 'hidden', 
            params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)',height: '0'}}"
      class="sublevel-nav"
    >
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
        <a class="sublevel-nav-link"
          *ngIf="item.items && item.items.length > 0 && item.showInMenu" 
          (click)="handleClick(item)"
        >
          <i class="sublevel-link-icon " [class]="item.icon"></i>
          <span class="sublevel-link-text" *ngIf="collapsed">{{item.label | translate}}</span>
          <i *ngIf="item.items && collapsed" class="menu-collapse-icon"
            [ngClass]="!item.expanded ? 'fal fa-caret-right' : 'fal fa-caret-down'"
          > </i>


        </a>
        <a class="sublevel-nav-link"
          *ngIf="(!item.items || (item.items && item.items.length === 0))  && item.showInMenu"
          [routerLink]="[item.routeLink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{exact: true}"
        >
          <i class="sublevel-link-icon " [class]="item.icon"></i>
          <span class="sublevel-link-text" *ngIf="collapsed">{{item.label | translate}}</span>

          <span class="tooltiptext p-2" @fadeInOut *ngIf="!collapsed" (click)="$event.stopPropagation()">{{item.label | translate}}</span>

        </a>
        <div *ngIf="item.items && item.items.length > 0 && item.showInMenu">
          <app-sublevel-menu
            [collapsed]="collapsed"
            [multiple]="multiple"
            [expanded]="item.expanded"
            ></app-sublevel-menu>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({overflow: 'hidden'}), 
        animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ]),

    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms',
          style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms',
          style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SublevelMenuComponent implements OnInit {

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: [],
    showInMenu: false
  }

  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  ngOnInit(): void {
  }

  handleClick(item: any) : void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }

    item.expanded = !item.expanded;
  }
}
