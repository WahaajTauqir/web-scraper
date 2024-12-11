import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  template: `
    <div>
      <h1>Web Scraper</h1>
      <input [(ngModel)]="url" placeholder="Enter URL" />
      <button (click)="scrape()">Scrape</button>
      <pre *ngIf="scrapedText" class="scraped-text">{{ scrapedText }}</pre>
    </div>
  `,
  styles: [`
    div { text-align: center; padding: 20px; }
    input { width: 70%; padding: 8px; }
    button { padding: 8px 15px; margin-left: 10px; }
    
    .scraped-text {
      white-space: normal;     
      word-wrap: break-word;   
      overflow-wrap: break-word; 
      text-align: left;        
      padding: 10px;
      background-color: #f4f4f4;
      margin-top: 20px;
      width: 80%;
      margin: 0 auto;
      border-radius: 5px;
    }
  `]
})
export class AppComponent {
  url: string = '';
  scrapedText: string = '';

  constructor(private http: HttpClient) {}

  scrape() {
    const apiUrl = `http://localhost:5000/scrape?url=${encodeURIComponent(this.url)}`;
    this.http.get<{ text: string }>(apiUrl)
      .subscribe({
        next: (data) => this.scrapedText = data.text,
        error: (err) => this.scrapedText = 'Error: ' + err.message
      });
  }
}
