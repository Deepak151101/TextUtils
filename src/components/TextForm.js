import React, { useEffect, useState } from "react";

function TextForm(props) {
  // States
  const [text, setText] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [countVowels, setCountVowels] = useState(0);
  const [countConsonants, setCountConsonants] = useState(0);

  // Effects
  useEffect(() => {
    if (copiedText.length > 0) {
      alert("length is: " + copiedText.length);
    }
  }, [copiedText]);

  // Methods
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Upper Case", "success");
  };

  const handleLoClick = () => {
    let lowText = text.toLowerCase();
    setText(lowText);
    props.showAlert("Converted to Lower Case", "success");
  };

  const handleAltClick = () => {
    let alternateCase = function () {
      let chars = text.toLowerCase().split("");
      for (let i = 0; i < chars.length; i += 2) {
        chars[i] = chars[i].toUpperCase();
      }
      return chars.join("");
    };
    setText(alternateCase());
    props.showAlert("Converted to Alternate Case", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Removed extra spaces", "success");
  };

  const handleClrClick = () => {
    let clrText = "";
    setText(clrText);
    setCountVowels(0);
    setCountConsonants(0);
    props.showAlert("Text cleared", "success");
  };

  const handleCpyTextClick = () => {
    let copyText = text;
    navigator.clipboard.writeText(copyText);
    setCopiedText(copyText);
    props.showAlert("Text copied to clipboard", "success");
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleVoClick = () => {
    let textToCount = text.toLowerCase();
    let count = 0;
    for (let i = 0; i < textToCount.length; i++) {
      if (textToCount[i].match(/[aeiou]/)) {
        count++;
      }
    }
    setCountVowels(count);
    props.showAlert("Counted vowels", "success");
  };

  const handleCoClick = () => {
    let textToCount = text.toLowerCase();
    let count = 0;
    for (let i = 0; i < textToCount.length; i++) {
      if (textToCount[i].match(/[bcdfghjklmnpqrstvwxyz]/)) {
        count++;
      }
    }
    setCountConsonants(count);
    props.showAlert("Counted consonants", "success");
  };

  return (
    <>
      <div className="container" style={{ backgroundColor: props.mode === "light" ? "white" : "black" }}>
        <h1>{props.heading}</h1>

        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>

        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick} disabled={text.length === 0}>
          Convert to Uppercase 
        </button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick} disabled={text.length === 0}>
          Convert to Lowercase
        </button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleAltClick} disabled={text.length === 0}>
          AlTeRnAtE tExT
        </button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces} disabled={text.length === 0}>
          Remove Extra Spaces
        </button>

        <button className="btn btn-primary mx-1 my-1" onClick={() => { handleCpyTextClick(); }} disabled={text.length === 0}>
          Copy Text to clipboard
        </button>

        <button className="btn btn-primary mx-1" onClick={handleVoClick} disabled={text.length === 0}>
          Count no. of Vowels
        </button>

        <button className="btn btn-primary mx-1" onClick={handleCoClick} disabled={text.length === 0}>
          Count no. of Consonants
        </button>

        <button className="btn btn-primary mx-1 my-1" onClick={speak} disabled={text.length === 0}>
          Speak
        </button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleClrClick} disabled={text.length === 0}>
          Clear
        </button>

        <h3>You have entered:</h3>
        <p>{countVowels} No. of Vowels</p>
        <p>{countConsonants} No. of Consonants</p>
      </div>

      <div className="container my-2" style={{ color: props.mode === "dark" ? "white" : "black" }}>
        <h2>Your Text Summary</h2>
        {text.length > 1 ? (
          <p>
            {text.split(" ").filter((element) => { return element.length !== 0; }).length} Words, {text.length} Characters
            <p>{0.008 * text.split(" ").length} Minutes to Read</p>
          </p>
        ) : (
          "0 words"
        )}
        <h2>Preview</h2>
        <p>
          {text.length > 0
            ? text
            : "Enter some text in the above textbox to preview here"}
        </p>
      </div>
    </>
  );
}

export default TextForm;
