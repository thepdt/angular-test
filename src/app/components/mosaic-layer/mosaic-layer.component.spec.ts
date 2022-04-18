import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosaicLayerComponent } from './mosaic-layer.component';

describe('FavoritesComponent', () => {
  let component: MosaicLayerComponent;
  let fixture: ComponentFixture<MosaicLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MosaicLayerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MosaicLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
