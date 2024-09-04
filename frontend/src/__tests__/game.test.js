import React from 'react';
import { render } from '@testing-library/react';
import Game from '../components/Game';
import "@testing-library/jest-dom"
describe('Game Component', () => {

  it('renders the game map correctly', () => {
    const map = [
      ['cell1', 'cell2', 'cell3'],
      ['cell4', 'cell5', 'cell6'],
      ['cell7', 'cell8', 'cell9']
    ];

    const { container } = render(<Game map={map} />);

    // Check that the map rows are rendered correctly
    expect(container.getElementsByClassName('row')).toHaveLength(3);

    // Check that the cells are rendered correctly
    expect(container.getElementsByClassName('cell')).toHaveLength(9);

    // Check for specific cells
    expect(container.querySelector('.cell.cell1')).toBeInTheDocument();
    expect(container.querySelector('.cell.cell5')).toBeInTheDocument();
  });

  it('renders nothing when map is null or undefined', () => {
    const { container } = render(<Game map={null} />);

    // Check that no rows are rendered
    expect(container.getElementsByClassName('row')).toHaveLength(0);
  });

  it('renders nothing when map is an empty array', () => {
    const { container } = render(<Game map={[]} />);

    // Check that no rows are rendered
    expect(container.getElementsByClassName('row')).toHaveLength(0);
  });

  it('calls useEffect on mount', () => {
    const useEffectSpy = jest.spyOn(React, 'useEffect');
    
    render(<Game map={[]} />);

    // Check if useEffect was called
    expect(useEffectSpy).toHaveBeenCalled();
  });
});
