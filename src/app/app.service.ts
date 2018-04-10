import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable()
export class AppService {
  url = 'http://localhost:3000';
  constructor(private webService: WebService) { }
  getProblems() {
    return this.webService.get(this.url + '/problemid').map(res => {
      return res.json();
    });
  }
  getCountries() {
    return this.webService.get(this.url + '/countries').map(res => {
      return res.json();
    })
  }
  getByCountry(country) {
    return this.webService.get(this.url + '/country/' + country).map(res => res.json());
  }
  getPage(page) {
    let params = '';
    if (page) {
      params = '?page=' + page;
    }
    return this.webService.get(this.url + params).map(res => {
      return res.json();
    });
  }
}
