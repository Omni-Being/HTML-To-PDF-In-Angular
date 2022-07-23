import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FasServiceService {

  url1="assets/all_data.json";
  url2="assets/oee_avail_trend.json";
  url3="assets/scrap_qty_per.json";
  constructor(private http:HttpClient) { }

  getAllData()
  {
    return this.http.get(this.url1);
  }

  getOEEData()
  {
    return this.http.get(this.url2);
  }

  getScrapData()
  {
    return this.http.get(this.url3);
  }

}
