import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="inline-flex items-center rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white
      hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
      focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60
      dark:focus-visible:ring-offset-slate-950"
      [disabled]="disabled()"
    >
      <ng-content />
    </button>
  `,
})
export class UiButtonComponent {
  disabled = input(false);
}
