import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CartStore } from 'cart-state';
import { createInstance } from '@module-federation/runtime';

type FederationInstance = {
  loadRemote<T = unknown>(id: string): Promise<T>;
};

type ReactRemoteMountModule = {
  renderWidget: (host: HTMLElement, props: { count: number; onAdd: () => void }) => void;
  unmountWidget?: (host: HTMLElement) => void;
};

let mfInstance: FederationInstance | undefined;

@Component({
  selector: 'react-host',
  template: `<div #mount></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactHostComponent implements OnDestroy {
  private cart = inject(CartStore);
  mount = viewChild.required<ElementRef<HTMLDivElement>>('mount');

  private unmountRemote?: (host: HTMLElement) => void;
  private readonly remoteMount = signal<ReactRemoteMountModule | null>(null);

  constructor() {
    mfInstance ??= createInstance({
      name: 'shell',
      remotes: [
        {
          name: 'mfe_react',
          entry: 'http://cart-mfe-react.up.railway.app/remoteEntry.js',
          type: 'module',
        },
      ],
    }) as unknown as FederationInstance;

    // Load the remote module once. Re-rendering is driven by the synchronous effect below.
    void (async () => {
      try {
        const mod = await mfInstance?.loadRemote<ReactRemoteMountModule>('mfe_react/mount');
        if (!mod) return;
        this.remoteMount.set(mod);
        this.unmountRemote = mod.unmountWidget;
      } catch (err) {
        console.error('Failed to load mfe_react/mount', err);
        this.remoteMount.set(null);
      }
    })();

    // IMPORTANT: keep this effect synchronous so signal reads are tracked.
    effect(() => {
      const mod = this.remoteMount();
      if (!mod) return;

      const el = this.mount().nativeElement;
      mod.renderWidget(el, {
        count: this.cart.count(),
        onAdd: () => this.cart.add({ id: 999, name: 'Item React', price: 10 }),
      });
    });
  }

  ngOnDestroy() {
    const host = this.mount().nativeElement;
    this.unmountRemote?.(host);
  }
}
