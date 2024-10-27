import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';

import { AppRevenueForecastComponent } from 'src/app/components/revenue-forecast/revenue-forecast.component';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [MaterialModule, AppRevenueForecastComponent],
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {}
