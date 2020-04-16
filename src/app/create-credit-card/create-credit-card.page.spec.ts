import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateCreditCardPage } from './create-credit-card.page';

describe('CreateCreditCardPage', () => {
  let component: CreateCreditCardPage;
  let fixture: ComponentFixture<CreateCreditCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCreditCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCreditCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
