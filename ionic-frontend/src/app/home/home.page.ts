import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Observable } from 'rxjs';
import SwiperCore, { SwiperOptions } from 'swiper';

import { DataService, Message } from '../services/data.service';
import { DateService, Date } from '../services/date.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectedDay!: number;
  selectedDate!: number;
  displaySelectedDate!: string;
  _calendarWindow!: Observable<Date[]>;
  calendarWindow: Date[] = [];

  constructor(private data: DataService, private date: DateService) { }

  ngOnInit() {
    this._calendarWindow = this.getDates();
    this._calendarWindow.subscribe(res => {
      res.forEach(d => {
        if (d.is_current) {
          this.setSelectedDate(d.day, d.month, d.month_str, d.year);
        }
        this.calendarWindow.push(d);
      })
    })
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 2000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  getDates(): Observable<Date[]> {
    return this.date.getCalendarWindow();
  }

  config: SwiperOptions = {
    slidesPerView: 7,
    spaceBetween: 5,
    initialSlide: 7,
  };

  setSelectedDate(day: number, month: number, month_str: string, year: number) {
    this.selectedDay = day;
    this.selectedDate = (year * 10000) + (month * 100) + day;
    this.displaySelectedDate = `${day} ${month_str.charAt(0).toUpperCase() + month_str.slice(1).toLowerCase()}, ${year}`;
  }

}
