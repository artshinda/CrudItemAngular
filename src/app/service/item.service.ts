import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Items } from '../constants/items';

@Injectable({
    providedIn: 'root'
})

export class ItemsServices{
    private BASE_URL = 'https://5d60ae24c2ca490014b27087.mockapi.io/api/v1/items';
    constructor(private http: HttpClient){}
        getItems(){
            return this.http.get<Items[]>(`${this.BASE_URL}`);
        }

        getItem(id){
            console.log('id',id)
            return this.http.get<Items>(`${this.BASE_URL}/${id}`);
        }

        deleteItem(id){
            return this.http.delete<Items>(`${this.BASE_URL}/${id}`);
        }

        saveItem(dataAppartement){
            console.log('dataAppartement', dataAppartement)
            return this.http.post<Items>(`${this.BASE_URL}/`,dataAppartement);
        }

}