import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);
  const [error, setError] = useState('');

  const handleNumberClick = (value) => {
    if (error) {
      setError('');
      setDisplay('0');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForSecondValue(false);
    }

    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else if (waitingForSecondValue) {
      setDisplay(value);
      setWaitingForSecondValue(false);
    } else if (value === '.' && display.includes('.')) {
      return; // Prevent multiple decimal points
    } else {
      setDisplay(display + value);
    }
  };

  const handleOperationClick = (op) => {
    if (error) {
      setError('');
      setDisplay('0');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForSecondValue(false);
    }

    if (previousValue !== null && !waitingForSecondValue) {
      calculateResult(op);
    } else {
      setPreviousValue(parseFloat(display));
      setOperation(op);
      setWaitingForSecondValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
    setError('');
  };

  const calculateResult = (nextOp = null) => {
    if (!previousValue || !operation) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '*':
        result = previousValue * current;
        break;
      case '/':
        if (current === 0) {
          setError('Cannot divide by zero');
          setDisplay('Error');
          setPreviousValue(null);
          setOperation(null);
          setWaitingForSecondValue(false);
          return;
        }
        result = previousValue / current;
        break;
      default:
        return;
    }

    if (!isFinite(result)) {
      setError('Result is undefined');
      setDisplay('Error');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForSecondValue(false);
      return;
    }

    setDisplay(result.toString());
    setPreviousValue(nextOp ? result : null);
    setOperation(nextOp || null);
    setWaitingForSecondValue(!!nextOp);
  };

  return (
    <ErrorBoundary>
      <div className="calculator">
        <div className="calculator-display">{error || display}</div>
        <div className="calculator-buttons">
          <button className="calculator-button clear" onClick={handleClear}>C</button>
          <button className="calculator-button operation" onClick={() => handleOperationClick('/')}>/</button>
          <button className="calculator-button" onClick={() => handleNumberClick('7')}>7</button>
          <button className="calculator-button" onClick={() => handleNumberClick('8')}>8</button>
          <button className="calculator-button" onClick={() => handleNumberClick('9')}>9</button>
          <button className="calculator-button operation" onClick={() => handleOperationClick('*')}>*</button>
          <button className="calculator-button" onClick={() => handleNumberClick('4')}>4</button>
          <button className="calculator-button" onClick={() => handleNumberClick('5')}>5</button>
          <button className="calculator-button" onClick={() => handleNumberClick('6')}>6</button>
          <button className="calculator-button operation" onClick={() => handleOperationClick('-')}>-</button>
          <button className="calculator-button" onClick={() => handleNumberClick('1')}>1</button>
          <button className="calculator-button" onClick={() => handleNumberClick('2')}>2</button>
          <button className="calculator-button" onClick={() => handleNumberClick('3')}>3</button>
          <button className="calculator-button operation" onClick={() => handleOperationClick('+')}>+</button>
          <button className="calculator-button zero" onClick={() => handleNumberClick('0')}>0</button>
          <button className="calculator-button" onClick={() => handleNumberClick('.')}>.</button>
          <button className="calculator-button equals" onClick={() => calculateResult()}>=</button>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
