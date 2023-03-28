import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Date {
	day: number;
	is_current: boolean;
	month: number;
	month_str: string;
	weekday: string;
	year: number;
}

@Injectable({
	providedIn: 'root'
})
export class DateService {
	// public dates: Date[] = [
    // {
    //   "day": 27,
    //   "is_current": false,
    //   "month": 3,
    //   "month_str": "MAR",
    //   "weekday": "MON",
    //   "year": 2023
    // },
    // {
    //   "day": 28,
    //   "is_current": false,
    //   "month": 3,
    //   "month_str": "MAR",
    //   "weekday": "TUE",
    //   "year": 2023
    // },
	// ];

	// public dates: [Date[], Date[], Date[]] = [
	// 	[
	// 		{
	// 			"day": 12,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "SUN",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 13,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "MON",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 14,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "TUE",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 15,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "WED",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 16,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "THU",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 17,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "FRI",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 18,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "SAT",
	// 			"year": 2023
	// 		}
	// 	],
	// 	[
	// 		{
	// 			"day": 19,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "SUN",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 20,
	// 			"is_current": true,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "MON",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 21,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "TUE",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 22,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "WED",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 23,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "THU",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 24,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "FRI",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 25,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "SAT",
	// 			"year": 2023
	// 		}
	// 	],
	// 	[
	// 		{
	// 			"day": 26,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "SUN",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 27,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "MON",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 28,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "TUE",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 29,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "WED",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 30,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "THU",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 31,
	// 			"is_current": false,
	// 			"month": 3,
	// 			"month_str": "MAR",
	// 			"weekday": "FRI",
	// 			"year": 2023
	// 		},
	// 		{
	// 			"day": 1,
	// 			"is_current": false,
	// 			"month": 4,
	// 			"month_str": "APR",
	// 			"weekday": "SAT",
	// 			"year": 2023
	// 		}
	// 	]
	// ];

	url: string = 'http://127.0.0.1:5000/utility/'

	constructor(private http: HttpClient) { }

	public getCalendarWindow(): Observable<Date[]> {
		return this.http.get<Date[]>(this.url);
	}
}
