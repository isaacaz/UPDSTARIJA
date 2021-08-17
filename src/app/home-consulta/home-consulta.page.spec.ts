import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeConsultaPage } from './home-consulta.page';

describe('HomeConsultaPage', () => {
  let component: HomeConsultaPage;
  let fixture: ComponentFixture<HomeConsultaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeConsultaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
