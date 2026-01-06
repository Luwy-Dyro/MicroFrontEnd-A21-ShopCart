import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CartStore } from 'cart-state';
import { UiDangerButtonComponent } from 'ui-kit';

@Component({
  selector: 'mfe-header',
  imports: [UiDangerButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="sticky top-0 z-10 w-full border-b border-pink-700 bg-white/90 backdrop-blur dark:border-pink-700 dark:bg-slate-950/80"
    >
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <div class="min-w-0">
          <div class="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">
            MicroFront Header
          </div>
          <div class="text-xs text-slate-200 dark:text-slate-200">Angular 21</div>
        </div>

        <div class="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
          <div class="whitespace-nowrap" aria-label="Carrito">
            <span aria-hidden="true">🛒</span>
            <span class="ml-1 font-semibold text-slate-900 dark:text-slate-50">{{ count() }}</span>
            <span class="ml-1">items</span>
          </div>

          <span class="hidden sm:inline text-slate-400 dark:text-slate-600" aria-hidden="true">•</span>

          <div class="whitespace-nowrap" aria-label="Total">
            <span class="text-slate-500 dark:text-slate-400">Total:</span>
            <span class="ml-1 font-semibold text-slate-900 dark:text-slate-50">S/ {{ total() }}</span>
          </div>

          <ui-danger-button (click)="clear()" aria-label="Vaciar carrito">Vaciar</ui-danger-button>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  private cart = inject(CartStore);
  count = this.cart.count;
  total = computed(() => this.cart.total().toFixed(2));
  clear() { this.cart.clear(); }
}
