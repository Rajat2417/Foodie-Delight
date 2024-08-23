import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss'
})
export class ForbiddenComponent implements OnInit {
  router = inject(Router)

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('')
    }, 500);
  }

}
