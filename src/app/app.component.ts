import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from './shared/book';

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private router: Router, private route:ActivatedRoute) { }

  bookSelected(book: Book) {
    this.router.navigate(['../books', book.isbn], { relativeTo: this.route});
  }
}