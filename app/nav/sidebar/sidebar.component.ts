import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() closeOnLink = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.closeOnLink.emit();
  }
}
