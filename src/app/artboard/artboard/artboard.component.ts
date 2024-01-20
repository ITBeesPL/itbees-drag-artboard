import { Component } from '@angular/core';
import { ToolboxComponent } from '../toolbox/toolbox.component';

@Component({
  selector: 'app-artboard',
  standalone: true,
  imports: [ToolboxComponent],
  templateUrl: './artboard.component.html',
  styleUrl: './artboard.component.scss'
})
export class ArtboardComponent {

}
