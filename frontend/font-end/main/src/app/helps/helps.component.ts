import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-helps',
  templateUrl: './helps.component.html',
  styleUrls: ['./helps.component.scss']
})
export class HelpsComponent {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/admin']);
  }
}
