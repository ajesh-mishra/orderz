import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FoodItem {
	id: number;
	name: string;
	is_veg: boolean;
	price: number;
	description: string;
}

@Injectable({
	providedIn: 'root'
})
export class MenuService {

	// public menu!: FoodItem[] = [
	// 	{
	// 		'name': 'Chilli Chicken',
	// 		'is_veg': false,
	// 		'price': 230
	// 	},
	// 	{
	// 		'name': 'Chicken Pakoda',
	// 		'is_veg': false,
	// 		'price': 200
	// 	},
	// 	{
	// 		'name': 'Chilli Paneer',
	// 		'is_veg': true,
	// 		'price': 100
	// 	},
	// 	{
	// 		'name': 'Aloo Paratha',
	// 		'is_veg': true,
	// 		'price': 1000
	// 	},
	// ];

	url: string = 'http://127.0.0.1:5000/menu/?date='

	constructor(private http: HttpClient) { }

	public getMenu(selectedDate: number): Observable<FoodItem[]> {
		return this.http.get<FoodItem[]>(this.url + selectedDate);
	}
}