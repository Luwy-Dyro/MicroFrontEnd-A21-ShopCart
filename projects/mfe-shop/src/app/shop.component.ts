import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartStore } from 'cart-state';
import { UiButtonComponent } from 'ui-kit';

type Product = Readonly<{ id: number; name: string; price: number }>;

@Component({
  selector: 'mfe-shop',
  imports: [UiButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto w-full max-w-5xl px-4 py-6 ">
      <header class="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">MicroFront Tienda</h2>
          <p class="text-sm text-slate-200 dark:text-slate-200">Angular 21</p>
        </div>
      </header>

      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        @for (p of products; track p.id) {
          <article
            class="rounded-xl border border-pink-600 bg-white p-4 shadow-sm dark:border-pink-600 dark:bg-slate-950"
            aria-label="Producto"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="truncate font-medium text-slate-900 dark:text-slate-50">{{ p.name }}</div>
                <div class="mt-1 text-sm text-pink-500 dark:text-pink-500">S/ {{ p.price }}</div>
              </div>

              <ui-button (click)="add(p)" aria-label="Agregar {{ p.name }} al carrito">Agregar</ui-button>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class ShopComponent {
  private cart = inject(CartStore);

  readonly products: readonly Product[] = [
    { id: 1, name: 'Mouse', price: 50 },
    { id: 2, name: 'Teclado', price: 120 },
    { id: 3, name: 'Audífonos', price: 180 },
  ];

  add(p: Product) { this.cart.add(p); }
}
