import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from '../components/Game';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../socketActions', () => ({
  setupMapListeners: jest.fn(() => () => []),
}));

describe('Game Component', () => {
  beforeEach(() => {
    require('react-redux').useSelector.mockImplementation(selector =>
      selector({
        map: [
          ["X", "X", "X", "X", "T", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
          ["L", "X", "X", "X", "Z", "X", "X", "J", "X", "X"],
          ["X", "X", "I", "X", "X", "X", "X", "X", "X", "O"],
        ]
      })
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders Game component and displays grid', () => {
    render(<Game />);

    expect(screen.getByTestId('cell-T')).toBeInTheDocument();
    expect(screen.getByTestId('cell-Z')).toBeInTheDocument();
    expect(screen.getByTestId('cell-L')).toBeInTheDocument();
    expect(screen.getByTestId('cell-O')).toBeInTheDocument();
    expect(screen.getByTestId('cell-J')).toBeInTheDocument();
  });

  test('renders empty grid when no map data is provided', () => {
    require('react-redux').useSelector.mockImplementation(selector =>
      selector({
        map: []
      })
    );

    render(<Game />);

    expect(screen.queryByTestId('cell-T')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cell-Z')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cell-L')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cell-O')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cell-J')).not.toBeInTheDocument();
  });
});
