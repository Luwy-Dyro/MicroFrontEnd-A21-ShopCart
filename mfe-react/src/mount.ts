import React from 'react';
import { createRoot, type Root } from 'react-dom/client';

import './index.css';

import Widget from './Widget';

type WidgetProps = {
  count: number;
  onAdd: () => void;
};

const roots = new WeakMap<HTMLElement, Root>();

export function renderWidget(host: HTMLElement, props: WidgetProps): void {
  const existingRoot = roots.get(host);
  const root = existingRoot ?? createRoot(host);
  if (!existingRoot) roots.set(host, root);

  root.render(React.createElement(Widget, props));
}

export function unmountWidget(host: HTMLElement): void {
  const root = roots.get(host);
  if (!root) return;
  root.unmount();
  roots.delete(host);
}
