import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Book, Thumbnail } from '../shared/book';
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styles: [
  ]
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(private bs: BookStoreService) {}

  ngOnInit() {
    this.bs.getAll().subscribe(res => this.books = res);
  }
}