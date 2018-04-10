import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  countries = [];
  data = [];
  problems = [];
  pageNumber = 0;
  numberOfElements = 24500;
  pageSize = 30;
  constructor(private appService: AppService) {
  }
  ngOnInit() {
    this.appService.getCountries().subscribe(res => {
      this.countries = res;
      this.countries.sort();
    });
    this.appService.getPage(0).subscribe(res => {
      console.log(res);
      this.data = res;
    });
    this.appService.getProblems().subscribe(res => {
      console.log(res);
      for (let id in res) {
        this.problems.push({
          label: id,
          key: res[id]
        });
      }
      console.log(this.problems);
    });
  }
  selectCountry(value) {
    this.appService.getByCountry(value).subscribe(res => {
      this.data = res;
      this.numberOfElements = 10;
      console.log(this.data);
    });
  }
  showAll() {
    this.pageNumber = 0;
    this.numberOfElements = 24500;
    this.appService.getPage(this.pageNumber).subscribe(res => {
      this.data =res;
      console.log('change data');
    });
  }
  changePage(event) {
    this.pageNumber = event.page - 1;
    this.appService.getPage(this.pageNumber).subscribe(res => {
      this.data = res;
      console.log('change data');
    });
  }
  penaltyAttemps(pos, d) {
    if (!this.problems[pos]) {
      return '';
    }
    let key = this.problems[pos]['key'];
    let selectedProblem;
    for (let problem of d['task_info']) {
      if (key === problem.task_id) {
        selectedProblem = problem;
        break;
      }
    }
    if (!selectedProblem) {
      return '-';
    }
    return selectedProblem.penalty_attempts ? selectedProblem.penalty_attempts : '-';
  }
  //yes, repeated code for no reason
  totalAttemps(pos, d) {
    if (!this.problems[pos]) {
      return '';
    }
    let key = this.problems[pos]['key'];
    let selectedProblem;
    for (let problem of d['task_info']) {
      if (key === problem.task_id) {
        selectedProblem = problem;
        break;
      }
    }
    if (!selectedProblem) {
      return '-';
    }
    return selectedProblem.total_attempts ? selectedProblem.total_attempts : '-';
  }
  score(pos, d) {
    if (!this.problems[pos]) {
      return '';
    }
    let key = this.problems[pos]['key'];
    let selectedProblem;
    for (let problem of d['task_info']) {
      if (key === problem.task_id) {
        selectedProblem = problem;
        break;
      }
    }
    if (!selectedProblem) {
      return '-';
    }
    return selectedProblem.score;
  }

}
