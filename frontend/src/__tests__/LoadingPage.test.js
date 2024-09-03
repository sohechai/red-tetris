import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingPage from '../components/LoadingPage';

describe('Composant LoadingPage', () => {
  test('affiche le texte de chargement avant que l\'animation ne commence', () => {
    render(<LoadingPage />);

    expect(screen.getByText('LOADING')).toBeInTheDocument();
    expect(screen.getByText('PLS')).toBeInTheDocument();
    expect(screen.getByText('WAIT')).toBeInTheDocument();
    
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument();
  });

  test('démarre l\'animation après 3 secondes', async () => {
    render(<LoadingPage />);

    expect(screen.getByText('LOADING')).toBeInTheDocument();
    expect(screen.getByText('PLS')).toBeInTheDocument();
    expect(screen.getByText('WAIT')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('LOADING')).not.toBeInTheDocument();
      expect(screen.queryByText('PLS')).not.toBeInTheDocument();
      expect(screen.queryByText('WAIT')).not.toBeInTheDocument();
    }, { timeout: 4000 });

    const loadingPageDiv = screen.getByTestId('loading-page');
    expect(loadingPageDiv).toHaveClass('animate');
  });
});
