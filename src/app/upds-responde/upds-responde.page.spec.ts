import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdsRespondePage } from './upds-responde.page';

describe('UpdsRespondePage', () => {
  let component: UpdsRespondePage;
  let fixture: ComponentFixture<UpdsRespondePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdsRespondePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdsRespondePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
