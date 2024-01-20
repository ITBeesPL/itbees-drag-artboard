import { Injectable, signal } from '@angular/core';

export type ToolType = "DRAG" | "ZOOM" | "SELECT" | "REMOVE";

@Injectable()
export class ArtboardService {
  activeTool = signal<ToolType>("DRAG");

  constructor() { }
}
