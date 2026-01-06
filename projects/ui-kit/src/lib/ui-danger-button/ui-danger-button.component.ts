import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-danger-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white
      hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
      focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60
      dark:focus-visible:ring-offset-slate-950"
      [disabled]="disabled()"
    >
      <ng-content />
    </button>
  `,
})
export class UiDangerButtonComponent {
  disabled = input(false);
}
