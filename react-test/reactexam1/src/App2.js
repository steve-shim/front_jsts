import { Component, useEffect, useState } from "react";
import "./App.css"

//고차 컴포넌트(HOC, Higher Order Component) 안에 우리가 랜더링할 Textfield 컴포넌트를 넣어준다
const TextFieldWithLabel = withError(withLabel(Textfield))

function App2() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError("Error...");
    }, 5000)
  }, [])

  return (
    <TextFieldWithLabel
      value={value}
      onChange={setValue}
      placeholder="please enter..."
      error={error}
      className="TextFieldWithLabel"
    >
      hello...
    </TextFieldWithLabel>
  );
}

//고차 컴포넌트(HOC, Higher Order Component)
function withLabel(Component) {
  console.log("withLabel")
  return ({ children, ...rest }) => {
    console.log("children", children) // hello...
    console.log("rest", rest) // {className: "TextFieldWithLabel", error: "", onChange: f(), placeholder:"please enter...", value: ""}
    return (
      <div>
        <label className="text-label">{children}</label>
        <Component {...rest} />
      </div>
    )
  }
}

function withError(Component) {
  return ({error = "", ...rest}) => (
    <div>
      <Component {...rest} />
      <div className="error">{error}</div>
    </div>
  )
}

function Textfield({ value, onChange, placeholder }) {
  console.log("Textfield")
  return (
    <div>
      <input
        value={value}
        type="text"
        placeholder={placeholder}
        className="text-input"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default App2;
