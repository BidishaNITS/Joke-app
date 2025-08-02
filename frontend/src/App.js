import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/api/joke');
      if (!res.ok) throw new Error('Network response was not ok');
      const { joke } = await res.json();
      setJoke(joke);
    } catch {
      setError('Failed to fetch joke. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="app">
      <div className="card">
        <h1>DevOps Joke</h1>

        {loading
          ? <p className="status">Loading…</p>
          : error
            ? <p className="status error">{error}</p>
            : <p className="joke">{joke}</p>
        }

        <button
          className="button"
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading ? 'Loading…' : 'Get New Joke'}
        </button>
      </div>
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [joke, setJoke] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:8000/api/joke')
//       .then(res => res.json())
//       .then(data => setJoke(data.joke));
//   }, []);

//   return (
//     <div>
//       <h1>Random Joke</h1>
//       <p>{joke}</p>
//     </div>
//   );
// }

// export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
