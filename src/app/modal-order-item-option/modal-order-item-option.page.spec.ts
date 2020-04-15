import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalOrderItemOptionPage } from './modal-order-item-option.page';

describe('ModalOrderItemOptionPage', () => {
  let component: ModalOrderItemOptionPage;
  let fixture: ComponentFixture<ModalOrderItemOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOrderItemOptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalOrderItemOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
