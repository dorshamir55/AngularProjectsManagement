import { Component, OnInit } from '@angular/core';
import { GlobalService } from './service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  currentProjectId!: number;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.getAllState().subscribe((state: any) => {
      this.currentProjectId = state.currentProjectId;
    });
    this.setTheme('theme-dark');
  }

  title = 'Projects Management';

  setTheme(themeName: string) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }
  
  toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark'){
      this.setTheme('theme-light');
    } else {
      this.setTheme('theme-dark');
    }
  }
}