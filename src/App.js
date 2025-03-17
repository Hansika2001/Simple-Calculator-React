import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [calculation, setCalculation] = useState('');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(false);

  const inputNumber = (num) => {
    if (display === '0' || newNumber) {
      setDisplay(num.toString());
      setNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const inputDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setCalculation('');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(false);
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    
    if (firstNumber === null) {
      setFirstNumber(current);
      setCalculation(`${current} ${op}`);
    } else if (operation) {
      const result = calculate(firstNumber, current, operation);
      setFirstNumber(result);
      setDisplay(String(result));
      setCalculation(`${result} ${op}`);
    }
    
    setNewNumber(true);
    setOperation(op);
  };

  const calculate = (first, second, op) => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷': return first / second;
      default: return second;
    }
  };

  const equals = () => {
    const current = parseFloat(display);
    if (operation && firstNumber !== null) {
      const result = calculate(firstNumber, current, operation);
      setDisplay(String(result));
      setCalculation(`${firstNumber} ${operation} ${current} = ${result}`);
      setFirstNumber(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display-container">
          <div className="calculation-display">{calculation}</div>
          <div className="display">{display}</div>
        </div>
        <div className="buttons">
          <button onClick={() => inputNumber(7)}>7</button>
          <button onClick={() => inputNumber(8)}>8</button>
          <button onClick={() => inputNumber(9)}>9</button>
          <button onClick={() => handleOperation('÷')}>÷</button>

          <button onClick={() => inputNumber(4)}>4</button>
          <button onClick={() => inputNumber(5)}>5</button>
          <button onClick={() => inputNumber(6)}>6</button>
          <button onClick={() => handleOperation('×')}>×</button>

          <button onClick={() => inputNumber(1)}>1</button>
          <button onClick={() => inputNumber(2)}>2</button>
          <button onClick={() => inputNumber(3)}>3</button>
          <button onClick={() => handleOperation('-')}>-</button>

          <button onClick={() => inputNumber(0)}>0</button>
          <button onClick={inputDecimal}>.</button>
          <button onClick={equals}>=</button>
          <button onClick={() => handleOperation('+')}>+</button>

          <button onClick={clear} className="clear">C</button>
        </div>
      </div>
    </div>
  );
}

export default App;
