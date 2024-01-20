import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  activeIndex = -1;

  items = [
    {
      color: '#00e4ff'
    },
    {
      color: '#00632b'
    },
    {
      color: '#e0c35b'
    },
    {
      color: '#2b004c'
    }
  ]
}
