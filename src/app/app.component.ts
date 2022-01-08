
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ViewRef } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export interface Entry {
  created: Date;
  id: string;
}

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent  {
  
  constructor(private changeDetector: ChangeDetectorRef) {

  }

  entries: Entry[] = [
   
   
  ];
  newId: string = 'first';
  
  private destroyed$ = new Subject();

  ngOnInit() {
    this.newId = 'first';
    this.addEntry();
    
    interval(1000).subscribe(() => {
      
      if (!(this.changeDetector as ViewRef).destroyed) {
    this.changeDetector.detectChanges();
}
    });

    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
   
    this.destroyed$.complete();
  }
  
  addEntry() {
    this.entries.push({
      created: new Date(),
      id: this.newId
    });
    this.newId = '';
  }

  getElapsedTime(entry: Entry): TimeSpan {        
    let totalSeconds = Math.floor((new Date().getTime() - entry.created.getTime()) / 1000);
    
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (totalSeconds >= 3600) {
      hours = Math.floor(totalSeconds / 3600);      
      totalSeconds -= 3600 * hours;      
    }

    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= 60 * minutes;
    }

    seconds = totalSeconds;
    
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
}
