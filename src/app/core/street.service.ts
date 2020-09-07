import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StreetService {

  public base_url = "neighborhoods";
  public url: any;

  constructor(private httpClient: HttpClient) { }


  public addStreetByName(payload: any): Promise<any | undefined> {
    this.url = `${environment.server}/${this.base_url}`;
    return this.httpClient.post(this.url, payload, {}).toPromise()
      .catch(err => alert(err.error.detail));
  }

  getUpdatedStreets(): Promise<any | undefined> { // return all
    this.url = `${environment.server}/${this.base_url}`;
    return this.httpClient.get(this.url, {}).toPromise()
      .catch(err => alert(err.error.detail));
  }

  updateStreetsByName(payload: any) {
    this.url = `${environment.server}/${this.base_url}/name`;
    return this.httpClient.get(this.url, payload).toPromise()
      .catch(err => alert(err.error.detail));
  }
}
