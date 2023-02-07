import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CountdownComponent implements OnInit{
  @Input() time!: number;
  private timing: number = 1000;
  private interval!: any;

  @Input()
  public setTime(value: string | number) {
    this.time = parseInt(value as string, 10);
    this._startTimer();
  }

  @Input()
  public setTiming(value: string | number) {
    this.timing = parseInt(value as string, 10);
    this._startTimer();
  }

  @Input()
  public format: string = '{dd} days {hh} hours {mm} minutes {ss} seconds';

  public get delta() {
    let date = new Date();
    return Math.max(0, Math.floor((this.time - date.getTime()) / 1000));
  }

  public get displayTime() {
    let days, hours, minutes, seconds, delta = this.delta, time = this.format;

    days = Math.floor(delta / 86400);
    delta -= days * 86400;
    hours = Math.floor(delta  / 3600) % 24;
    delta -= hours * 3600;
    minutes = Math.floor(delta  / 60) % 60;
    delta -= minutes * 60;
    seconds = delta % 60;

    time = time.replace('{dd}', days.toString());
    time = time.replace('{hh}', hours.toString());
    time = time.replace('{mm}', minutes.toString());
    time = time.replace('{ss}', seconds.toString());

    return time;
  }

  constructor(private _changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setTime(this.time);
  }

  private _startTimer() {
    if(this.delta <= 0) return;
    this._stopTimer();
    this.interval = setInterval(() => {
      this._changeDetector.detectChanges();
      if(this.delta <= 0) {
        this._stopTimer();
      }
    }, this.timing);
  }

  private _stopTimer() {
    clearInterval(this.interval);
    this.interval = undefined;
  }
}
