import { Component } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner"
import { MatProgressBar } from "@angular/material/progress-bar"

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatProgressBar
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
