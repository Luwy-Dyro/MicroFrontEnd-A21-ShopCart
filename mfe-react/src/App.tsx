import { useState } from 'react';

import './App.css';
import Widget from './Widget';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen w-full bg-slate-50 p-6 text-slate-900 
    ">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-lg font-semibold">mfe-react</h1>
        <p className="mt-1 text-sm text-slate-600">
          Preview local del widget remoto.
        </p>

        <div className="mt-6">
          <Widget count={count} onAdd={() => setCount((c) => c + 1)} />
        </div>
      </div>
    </main>
  );
}

export default App;
