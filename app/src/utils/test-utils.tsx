import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { AppStore, RootState, setupStore } from '../app/store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  routerProps?: MemoryRouterProps;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    routerProps = {},
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <MemoryRouter {...routerProps}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}