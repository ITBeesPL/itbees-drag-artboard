import { Component, HostBinding, OnInit, WritableSignal, effect } from '@angular/core';
import { ToolboxComponent } from '../toolbox/toolbox.component';
import { ArtboardService, ToolType } from '../artboard.service';

@Component({
  selector: 'app-artboard',
  standalone: true,
  imports: [ToolboxComponent],
  templateUrl: './artboard.component.html',
  styleUrl: './artboard.component.scss',
  providers: [ArtboardService]
})
export class ArtboardComponent implements OnInit {
  @HostBinding('style.cursor') cursorType = 'default';

  activeTool!: WritableSignal<ToolType>;

  e = effect(() => {
    const activeTool = this.activeTool();
    let cursorType = '';
    switch (activeTool) {
      case 'DRAG':
        cursorType = 'grab'
        break;
      case 'ZOOM':
        cursorType = 'zoom-in'
        break;
      case 'SELECT':
        cursorType = 'default'
        break;    
      case 'REMOVE':
        cursorType = 'default'
        break;    
      default:
        cursorType = 'default'
        break;
    }
    this.cursorType = cursorType;
  });

  constructor(private artboardService: ArtboardService) {}

  ngOnInit() {
    this.activeTool = this.artboardService.activeTool;
    this.activeTool.update
  }
}
