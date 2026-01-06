import { ChangeDetectionStrategy, Component, Type, signal } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { NgComponentOutlet } from '@angular/common';
import { ReactHostComponent } from './react-host.component';

@Component({
  imports: [NgComponentOutlet, ReactHostComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<main class="flex flex-col justify-between h-screen">
    <div class="page">
      <!-- 1) HEADER REMOTE -->
      <section class="block header">
        @if (headerCmp()) {
          <ng-container *ngComponentOutlet="headerCmp()" />
        } @else {
          <div class="skeleton">Cargando Header...</div>
        }
      </section>

      <!-- 2) SHOP REMOTE -->
      <section class="block shop my-6">
        @if (shopCmp()) {
          <ng-container *ngComponentOutlet="shopCmp()" />
        } @else {
          <div class="skeleton">Cargando Shop...</div>
        }
      </section>

      <!-- 3) REACT REMOTE -->
      <section class="block react mt-10">
        <react-host />
      </section>
    </div>

        
    <footer class="mt-10">
      <div class="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
    
        <div class="flex gap-2">
          <img alt="logo" loading="lazy" width="27" height="30" decoding="async" data-nimg="1" class="animate__animated animated flip animate__infinite dark-version logo_home" style="color: transparent; --animate-duration: 4s;" src="https://luwydev.com/_next/static/media/logo_LD.199c47f2.svg">
          <img alt="logo" loading="lazy" width="91" height="23" decoding="async" data-nimg="1" class="dark-version" style="color:transparent" src="https://luwydev.com/_next/static/media/logo_luwydyro.07b1498c.svg">   
        </div>
        
        MicroFront Native Federation - Angular 21 & React 18
      
      </div>
    </footer> 
</main>

  `
})
export class HomeComponent {
  readonly headerCmp = signal<Type<unknown> | null>(null);
  readonly shopCmp = signal<Type<unknown> | null>(null);

  async ngOnInit() {
    // 1) Cargar Header remote (mfe-header)
    try {
      const headerRemote = (await loadRemoteModule('mfe-header', './Routes')) as {
        routes?: Array<{ component?: Type<unknown> }>;
      };
      this.headerCmp.set(headerRemote.routes?.[0]?.component ?? null);
    } catch (err) {
      console.error('Failed to load mfe-header', err);
      this.headerCmp.set(null);
    }

    // 2) Cargar Shop remote (mfe-shop)
    try {
      const shopRemote = (await loadRemoteModule('mfe-shop', './Routes')) as {
        routes?: Array<{ component?: Type<unknown> }>;
      };
      this.shopCmp.set(shopRemote.routes?.[0]?.component ?? null);
    } catch (err) {
      console.error('Failed to load mfe-shop', err);
      this.shopCmp.set(null);
    }
  }
}
