import { Injectable, computed, signal } from '@angular/core';

export type CartItem = { id: number; name: string; price: number; qty: number };

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().reduce((acc, i) => acc + i.qty, 0));
  readonly total = computed(() => this._items().reduce((acc, i) => acc + i.qty * i.price, 0));

  add(item: Omit<CartItem, 'qty'>) {
    const items = this._items();
    const found = items.find(x => x.id === item.id);

    if (!found) this._items.set([...items, { ...item, qty: 1 }]);
    else this._items.set(items.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
  }

  removeOne(id: number) {
    const items = this._items();
    const found = items.find(x => x.id === id);
    if (!found) return;

    if (found.qty <= 1) this._items.set(items.filter(x => x.id !== id));
    else this._items.set(items.map(x => x.id === id ? { ...x, qty: x.qty - 1 } : x));
  }

  clear() {
    this._items.set([]);
  }
}
