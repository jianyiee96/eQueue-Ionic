import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabQueuePage } from './tab-queue.page';

describe('TabQueuePage', () => {
  let component: TabQueuePage;
  let fixture: ComponentFixture<TabQueuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabQueuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabQueuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
