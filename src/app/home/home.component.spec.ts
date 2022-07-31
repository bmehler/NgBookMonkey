import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h1> with "Home"', () => {
    const homeElement: HTMLElement = fixture.nativeElement;
    const h1 = homeElement.querySelector('h1')!;
    expect(h1.textContent).toEqual('Home');
  });

  it('should have <p> with "Das ist der BookMonkey."', () => {
    const textElement: HTMLElement = fixture.nativeElement;
    const p = textElement.querySelector('p')!;
    expect(p.textContent).toEqual('Das ist der BookMonkey.');
  });

  it('should have <a> with "Buchliste ansehen"', () => {
    const buttonTextElement: HTMLElement = fixture.nativeElement;
    const a = buttonTextElement.querySelector('a')!;
    expect(a.textContent).toEqual(' Buchliste ansehen ');
  });
});
