import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ArrayService } from 'src/app/shared/array.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  public packages: any[] = []; // Array to hold shared package data

  constructor(private titleService: Title, private arrayService: ArrayService) {
    this.titleService.setTitle('Pricing Plans'); // Set the page title
  }

  ngOnInit(): void {
    // Load shared array from the service
    this.packages = this.arrayService.sharedArray;
  }
}
