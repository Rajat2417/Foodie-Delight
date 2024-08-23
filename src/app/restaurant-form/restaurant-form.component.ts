import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AppserviceService } from '../appservice.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Restaurant, Restaurant_Form } from '../Interfaces/genericInterfaces';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
  providers: [BsModalService],
  templateUrl: './restaurant-form.component.html',
  styleUrl: './restaurant-form.component.scss'
})
export class RestaurantFormComponent implements OnInit {

  private _snackBar = inject(MatSnackBar);
  public appService = inject(AppserviceService)
  @Input() toForm!: Restaurant
  @Output() formSubmit = new EventEmitter()

  fb = inject(FormBuilder)

  form!: FormGroup

  @ViewChild('r_form') r_form: any

  modalService = inject(BsModalService);
  modal_ref!: BsModalRef

  r_type_list: Restaurant_Form[] = [
    { item_desc: 'All' },
    { item_desc: 'Dine-in' },
    { item_desc: 'Delivery' },
  ]

  r_food_type_list: Restaurant_Form[] = [
    { item_desc: 'All' },
    { item_desc: 'Veg' },
    { item_desc: 'Non Veg' },
  ]

  r_type_cuisine: Restaurant_Form[] = [
    { item_desc: 'Japanese' },
    { item_desc: 'Indian' },
    { item_desc: 'Chinese' },
    { item_desc: 'Thai' },
    { item_desc: 'Mexican' },
    { item_desc: 'Greek' },
    { item_desc: 'Spanish' },
    { item_desc: 'French' },
    { item_desc: 'Italian' },
    { item_desc: 'Korean' }
  ]


  ngOnInit(): void {
    this.createForm()
    if(this.toForm) {
      this.form.patchValue({...this.form.value, ...this.toForm})
    }
    setTimeout(() => {
      this.modal_ref = this.modalService.show(this.r_form, { class: 'form-lg', ignoreBackdropClick: true })
    }, 10);
  }

  createForm() {
    this.form = this.fb.group({
      restaurant_name: ['', Validators.required],
      restaurant_address: ['', Validators.required],
      restaurant_type: ['', Validators.required],
      restaurant_food_offered: ['', Validators.required],
      restaurant_cuisine: [[], Validators.required],
      restaurant_description: ['', Validators.required],
      img: '',
      restaurant_image: '',
      active: true
    })
  }

  submitForm() {
    if(this.form.value.img) {
      this.form.controls['restaurant_image'].setValue('../../assets/Images/' + this.form.value.img.split('\\')[2])
    }
    this._snackBar.open(this.toForm ? 'Updated Successfully' : 'Added Successfully', 'Undo', {
      duration: 3000
    });

    this.modal_ref.hide()
    this.formSubmit.emit({form: this.form.getRawValue()})
  }


}
