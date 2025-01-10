import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-lieu-details',
  templateUrl: './lieu-details.component.html',
  styleUrl: './lieu-details.component.scss'
})
export class LieuDetailsComponent implements OnInit {
  public lieuId: string | null = ''

  constructor(private route: ActivatedRoute) { }

  public ngOnInit() {
    this.lieuId = this.route.snapshot.paramMap.get('id')

    console.log('LieuDetailsComponent initialized with lieuId:', this.lieuId)
  }
}
