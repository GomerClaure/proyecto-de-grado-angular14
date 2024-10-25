import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPedidosRComponent} from'../lista-pedidosR/lista-pedidosR.component'

describe('ListaPedidosComponent', () => {
  let component: ListaPedidosRComponent;
  let fixture: ComponentFixture<ListaPedidosRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPedidosRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPedidosRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
