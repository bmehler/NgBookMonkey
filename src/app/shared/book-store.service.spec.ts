import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Book } from './book';
import { BookStoreService } from './book-store.service';

describe('BookStoreService', () => {

  const expectedBooks = [
    {
      isbn: '3864901545',
      title: 'Book 1',
      authors: [],
      published: new Date()
    },
    {
      isbn: '9783864903571',
      title: 'Book 2',
      authors: [],
      published: new Date()
    }
  ];

  let httpMock: { get: () => Observable<Book[]> };

  beforeEach(() => {

    httpMock = {
      get: () => of(expectedBooks)
    };

    spyOn(httpMock, 'get').and.callThrough();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpMock
        },
        BookStoreService
      ]
    });
  });

  it('should GET a list of all books',
    inject([BookStoreService], (service: BookStoreService) => {

      let receivedBooks: Book[] = [];
      service.getAll().subscribe(b => receivedBooks = b);

      expect(receivedBooks.length).toBe(2);
      expect(receivedBooks[0].isbn).toBe('3864901545');
      expect(receivedBooks[1].isbn).toBe('9783864903571');

      expect(httpMock.get).toHaveBeenCalledTimes(1);
    }));
});

describe('BookStoreService', () => {
  let service: BookStoreService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookStoreService],
    });

    service = TestBed.inject(BookStoreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should get a single Book', () => {
    service.getSingle('9783864903571').subscribe((data: any) => {
      expect(data.name).toBe('9783864903571');
    });

    const req = httpMock.expectOne(`https://book-monkey2-api.angular-buch.com/book/9783864903571`, 'call to api');
    expect(req.request.method).toBe('GET');

    httpMock.verify();
  });

  it('should remove a single Book', () => {
    service.remove('9783864903571').subscribe((data: any) => {
      expect(data).toBe('9783864903571');
    });
  
    const req = httpMock.expectOne(
      `https://book-monkey2-api.angular-buch.com/book/9783864903571`,
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush('9783864903571');
  
    httpMock.verify();
  });

  it('should create a single Book', () => {
    service.create({isbn: '9783864903576', title: 'Book 2', authors: [], published: new Date }).subscribe((data: any) => {
      expect(data.isbn).toBe('9783864903576');
    });
  
    const req = httpMock.expectOne(
      `https://book-monkey2-api.angular-buch.com/book`,
      'create to api'
    );
    expect(req.request.method).toBe('POST');
  
    httpMock.verify();
  });

  it('should update a single Book', () => {
    service.update({isbn: '9783864903571', title: 'Book 2', authors: [], published: new Date }).subscribe((data: any) => {
      expect(data.isbn).toBe('9783864903571');
    });
  
    const req = httpMock.expectOne(
      `https://book-monkey2-api.angular-buch.com/book/9783864903571`,
      'update to api'
    );
    expect(req.request.method).toBe('PUT');
  
    httpMock.verify();
  });
});