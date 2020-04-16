import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCreditCardPage } from './view-credit-card.page';

describe('ViewCreditCardPage', () => {
  let component: ViewCreditCardPage;
  let fixture: ComponentFixture<ViewCreditCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCreditCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCreditCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
