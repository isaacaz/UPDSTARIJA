import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilosofiaPage } from './filosofia.page';

describe('FilosofiaPage', () => {
  let component: FilosofiaPage;
  let fixture: ComponentFixture<FilosofiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilosofiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilosofiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
