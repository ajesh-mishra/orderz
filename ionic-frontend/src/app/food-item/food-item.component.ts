import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService, FoodItem } from '../services/menu.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
})
export class FoodItemComponent implements OnInit {
  @Input() selectedDate!: number;
  todaysMenu!: Observable<FoodItem[]>;

  constructor(private menu: MenuService) {}

  ngOnInit() {}
  
  ngOnChanges(changes: SimpleChange) {
    this.todaysMenu = this.menu.getMenu(this.selectedDate);
  }

}
