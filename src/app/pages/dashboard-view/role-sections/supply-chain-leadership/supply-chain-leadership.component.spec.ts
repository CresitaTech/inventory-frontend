import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyChainLeadershipComponent } from './supply-chain-leadership.component';

describe('SupplyChainLeadershipComponent', () => {
  let component: SupplyChainLeadershipComponent;
  let fixture: ComponentFixture<SupplyChainLeadershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplyChainLeadershipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyChainLeadershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
