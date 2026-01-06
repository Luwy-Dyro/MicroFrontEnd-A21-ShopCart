import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  imports: [RouterOutlet, NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app">
      <section class="header">
        @if (headerCmp()) {
          <ng-container *ngComponentOutlet="headerCmp()" />
        }
      </section>

      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app{min-height:100vh;}
    .header{position:sticky; top:0; background:white; z-index:10;}
    .content{padding:12px;}
  `]
})
export class ShellLayoutComponent {
  readonly headerCmp = signal<Type<unknown> | null>(null);

  async ngOnInit() {
    // Carga el remote expuesto como './Routes' y toma el component de la ruta ''
    type RemoteRoutes = { routes?: Array<{ component?: Type<unknown> }> };

    try {
      const remote = (await loadRemoteModule('mfe-header', './Routes')) as RemoteRoutes;
      this.headerCmp.set(remote.routes?.[0]?.component ?? null); // header route: { path:'', component: HeaderComponent }
    } catch (err) {
      console.error('Failed to load mfe-header', err);
      this.headerCmp.set(null);
    }
  }
}
