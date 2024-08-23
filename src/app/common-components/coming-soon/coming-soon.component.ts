import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [],
  providers: [BsModalService],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent implements OnInit {
  @ViewChild('picture') picture: any
  public modalSerivce = inject(BsModalService)
  modalref!: BsModalRef

  ngOnInit(): void {
    setTimeout(() => {
      this.modalref = this.modalSerivce.show(this.picture, { ignoreBackdropClick: true })
    }, 10);
    setTimeout(() => {
      this.modalref.hide()
    }, 2500);
  }
}
