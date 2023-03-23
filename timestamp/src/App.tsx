import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <h1>Timestamp Microservice</h1>
      <hr />
      <div className="container">
        <h3>Example Usage:</h3>
        <ul>
          <li>
            <a href="api/2015-12-25">[project url]/api/2015-12-25</a>
          </li>
          <li>
            <a href="api/1451001600000">[project url]/api/1451001600000</a>
          </li>
        </ul>

        <h3>Example Output:</h3>
        <p>
          <code>
            {`{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }`}
          </code>
        </p>
      </div>
      <div className="footer">
        <p>
          By <a href="https://www.freecodecamp.org/">freeCodeCamp.org</a>
        </p>
      </div>
    </div>
  );
}

export default App;
