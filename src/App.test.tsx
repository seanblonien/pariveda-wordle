import {render, screen} from '@testing-library/react';
import {App} from './App';
import {GAME_TITLE} from './constants/strings';
import {GlobalContextProvider} from './context/GlobalContext';

test('renders App component', () => {
  render(
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>,
  );
  const linkElement = screen.getByText(GAME_TITLE);
  expect(linkElement).toBeInTheDocument();
});
