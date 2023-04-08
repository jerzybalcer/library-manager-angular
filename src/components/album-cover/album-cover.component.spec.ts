import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCoverComponent } from './album-cover.component';

describe('AlbumCoverComponent', () => {
  let component: AlbumCoverComponent;
  let fixture: ComponentFixture<AlbumCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumCoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
