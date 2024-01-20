import { Component, HostBinding, OnInit, WritableSignal, effect } from '@angular/core';
import { ToolboxComponent } from '../toolbox/toolbox.component';
import { ArtboardService, ToolType } from '../artboard.service';
import { LibraryComponent } from '../library/library.component';
import { ArtBoardItem } from '../models';
import { ItemComponent } from '../item/item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artboard',
  standalone: true,
  imports: [CommonModule, ToolboxComponent, LibraryComponent, ItemComponent],
  templateUrl: './artboard.component.html',
  styleUrl: './artboard.component.scss',
  providers: [ArtboardService]
})
export class ArtboardComponent implements OnInit {
  @HostBinding('style.cursor') cursorType = 'default';
  activeTool!: WritableSignal<ToolType>;
  snapToGrid = true;
  gridSize = 20;
  cursorChange = effect(() => {
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
  items: ArtBoardItem[] = [];

  constructor(private artboardService: ArtboardService) {}

  ngOnInit() {
    this.activeTool = this.artboardService.activeTool;
    this.activeTool.update
  }

  onClick(ev: MouseEvent) {
    const offsetX = !this.snapToGrid ? ev.offsetX : this.snapCalc(ev.offsetX);
    const offsetY = !this.snapToGrid ? ev.offsetY : this.snapCalc(ev.offsetY);

    const item: ArtBoardItem = {
      x: offsetX,
      y: offsetY,
      width: 100,
      height: 100,
      color: '#E0C35B'
    }
    this.items.push(item);
  }

  private snapCalc(offset: number) {
    const start = this.gridSize * Math.floor(offset / this.gridSize);
    const end = this.gridSize * Math.ceil(offset / this.gridSize);
    const min = Math.abs(offset - start);
    const max = Math.abs(offset - end);
    if (min < max) {
      return start;
    } else {
      return end;
    }
  }
}
