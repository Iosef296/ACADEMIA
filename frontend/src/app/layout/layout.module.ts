import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, ShellComponent],
  imports: [CommonModule, RouterModule],
  exports: [ShellComponent],
})
export class LayoutModule {}
