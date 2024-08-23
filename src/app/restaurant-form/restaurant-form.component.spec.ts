import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFormComponent } from './restaurant-form.component';

describe('RestaurantFormComponent', () => {
  let component: RestaurantFormComponent;
  let fixture: ComponentFixture<RestaurantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RestaurantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.controls['restaurant_name'].value).toBe('');
    expect(component.form.controls['restaurant_address'].value).toBe('');
    expect(component.form.controls['restaurant_type'].value).toBe('');
    expect(component.form.controls['restaurant_food_offered'].value).toBe('');
    expect(component.form.controls['restaurant_cuisine'].value).toEqual([]);
    expect(component.form.controls['restaurant_description'].value).toBe('');
    expect(component.form.controls['img'].value).toBe('');
    expect(component.form.controls['restaurant_image'].value).toBe('');
  });

  it('form should be invalid if field is empty', () => {
    const nameControl = component.form.get('restaurant_name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();
    fixture.detectChanges();

    expect(nameControl.status).toContain('INVALID');
    expect(nameControl.invalid).toBeTruthy()
  });
});
