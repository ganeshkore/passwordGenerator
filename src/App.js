import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pwd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*><.:;'+-_";

    for (let index = 1; index <= length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pwd += str.charAt(char);
    }

    setPassword(pwd);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const passwordRef = useRef(null);
  return (
    <div className="container">
      <h1>Password Generator</h1>

      <div className="pwdarea">
        <div className="box">
          <input
            type="text"
            ref={passwordRef}
            readOnly
            id="pwdfield"
            value={password}
          />

          <button id="btn" onClick={copyPassword}>
            Copy
          </button>
        </div>

        <div className="box">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label>Number</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label>Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
