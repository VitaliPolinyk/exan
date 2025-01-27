import { Component, EventEmitter, forwardRef, Output, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-exan-input',
  imports: [
    MatButtonModule,
    MatIconModule,
    NgStyle,
    FormsModule
  ],
  templateUrl: './exan-input.component.html',
  standalone: true,
  styleUrl: './exan-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExanInputComponent),
      multi: true
    }
  ]
})
export class ExanInputComponent implements ControlValueAccessor {

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  disabled: WritableSignal<boolean> = signal(false);

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  private _value: string = '';

  private onTouchedCallback: () => void = () => {
  };
  private onChangeCallback: (_: any) => void = () => {
  };

  public get value(): string {
    return this._value;
  }

  public set value(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.onChangeCallback(v);
    }
  }

  public writeValue(v: string) {
    if (v !== this._value) {
      this._value = v;
    }
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
