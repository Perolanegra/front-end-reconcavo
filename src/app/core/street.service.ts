import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { query } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})
export class StreetService {

  public base_url = "neighborhoods";


  constructor(private httpClient: HttpClient) { }


  public addStreetByName(payload: any): Promise<any | undefined> {
    const url = `${environment.server}/${this.base_url}`;
    return this.httpClient.post(url, payload, {}).toPromise()
      .catch(err => alert(err.error.detail));
  }

  getUpdatedStreets(): Promise<any | undefined> { // return all
    const url = `${environment.server}/${this.base_url}`;
    return this.httpClient.get(url).toPromise()
      .catch(err => alert(err.error.detail));
  }

  updateStreetsByName(payload: any) {
    const url = `${environment.server}/${this.base_url}/name`;
    return this.httpClient.get(url, { params: payload }).toPromise()
      .catch(err => alert(err.error.detail));
  }
}
