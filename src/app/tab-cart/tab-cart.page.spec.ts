import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabCartPage } from './tab-cart.page';

describe('TabCartPage', () => {
  let component: TabCartPage;
  let fixture: ComponentFixture<TabCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
