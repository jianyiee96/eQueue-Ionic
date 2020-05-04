import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ModalViewTransactionDetailsPage } from './modal-view-transaction-details.page';

describe('ModalViewTransactionDetailsPage', () => {
  let component: ModalViewTransactionDetailsPage;
  let fixture: ComponentFixture<ModalViewTransactionDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewTransactionDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalViewTransactionDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
