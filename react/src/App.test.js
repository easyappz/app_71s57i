import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Calculator Functionality', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders calculator display', () => {
    const displayElement = screen.getByText('0');
    expect(displayElement).toBeInTheDocument();
  });

  test('handles number input correctly', () => {
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  test('performs addition correctly', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  test('performs subtraction correctly', () => {
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('performs multiplication correctly', () => {
    fireEvent.click(screen.getByText('6'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  test('performs division correctly', () => {
    fireEvent.click(screen.getByText('8'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('handles division by zero', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Cannot divide by zero')).toBeInTheDocument();
  });

  test('clears the calculator state', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('C'));
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('prevents multiple decimal points', () => {
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('.')); // Should not add another decimal
    expect(screen.getByText('1.5')).toBeInTheDocument();
  });

  test('handles operation chaining', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('8')).toBeInTheDocument();
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
