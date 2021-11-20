import { FC, useEffect } from "react";

import { ExpressionEvaluation } from "utils";

const App: FC = () => {
  useEffect(() => {
    ExpressionEvaluation.calculate("3 + 4 * 2 / ( 1 - 5 ) * 3");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <br />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
