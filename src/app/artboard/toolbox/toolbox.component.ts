import { Component, OnInit, TemplateRef, WritableSignal } from '@angular/core';
import { ArtboardService, ToolType } from '../artboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.scss'
})
export class ToolboxComponent implements OnInit {
  constructor(private artboardService: ArtboardService) {}
  
  items: { icon: string; action: ToolType }[] = [
    {
      icon: 'icon_drag',
      action: 'DRAG'
    },
    {
      icon: 'icon_zoom',
      action: 'ZOOM'
    },
    {
      icon: 'icon_select',
      action: 'SELECT'
    },
    {
      icon: 'icon_remove',
      action: 'REMOVE'
    },
  ]

  activeTool!: WritableSignal<ToolType>;

  ngOnInit() {
    this.activeTool = this.artboardService.activeTool;
  }

  selectAction(type: ToolType) {
    this.artboardService.activeTool.set(type);
  }
}
