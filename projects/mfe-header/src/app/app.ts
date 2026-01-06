import { RouterOutlet } from '@angular/router';

import { Component, signal} from '@angular/core';

// import { CartStore } from 'cart-state';
// import { UiButtonComponent } from 'ui-kit';

@Component({
  selector: 'app-root',
  // imports: [UiButtonComponent],
  imports: [RouterOutlet], 
  templateUrl: './app.html',
  styleUrl: './app.css',

})
export class App {
  protected readonly title = signal('mfe-header');

  //  private cart = inject(CartStore);
  // count = this.cart.count;
  // total = computed(() => this.cart.total().toFixed(2));
  // clear() { this.cart.clear(); }
}
