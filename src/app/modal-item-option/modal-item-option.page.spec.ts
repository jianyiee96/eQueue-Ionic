import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalItemOptionPage } from './modal-item-option.page';

describe('ModalItemOptionPage', () => {
  let component: ModalItemOptionPage;
  let fixture: ComponentFixture<ModalItemOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalItemOptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalItemOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
