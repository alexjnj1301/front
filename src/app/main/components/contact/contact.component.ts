import { Component, OnInit } from '@angular/core';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactTranslateValues: any = {}

  constructor(private translateValues: MultipleTransLoaderHttp) { }

  public ngOnInit(): void {
    this.translateValues.getTranslation().subscribe((result) => {
      this.contactTranslateValues = result.contact;
    })
  }
}
