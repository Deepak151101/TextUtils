import React, { useEffect, useState } from "react";

function TextForm(props) {
  //states
  const [text, setText] = useState("");
  const [copiedText, setCopiedText] = useState("");

  // text = "new Text"; // Wrong way to change the state
  // setText("New Text is here - Text2"); // Correct way to change the state

  //effects
  useEffect(() => {
    if (copiedText.length > 0) {
      alert("length is: " + copiedText.length);
    }
  }, [copiedText]);

  //methods
  const handleUpClick = () => {
    console.log("UpperCase was clicked- " + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Upper Case", "success");
  };

  const handleLoClick = () => {
    console.log("LowerCase is Clicked - " + text);
    let lowText = text.toLowerCase();
    setText(lowText);
    props.showAlert("Converted to Lower Case", "success");
  };

  const handleAltClick = () => {
    let alternateCase = function () {
      let chars = text.toLowerCase().split("");
      for (var i = 0; i < chars.length; i += 2) {
        chars[i] = chars[i].toUpperCase();
      }
      return chars.join("");
    };
    setText(alternateCase);
    console.log("Alternate Text was clicked");
    props.showAlert("Converted to Alternate Case", "success");
  };

  const handleClrClick = () => {
    console.log("Clear was Clicked");
    let clrText = "";
    setText(clrText);
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
    console.log("On Change");
    setText(event.target.value);
  };

  return (
    <>
      <div className="container" style={{color: props.mode === 'dark'? 'white':'#042743'}}>
        <h1>{props.heading}</h1>

        {/* textarea */}
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style = {{backgroundColor: props.mode === 'dark'? 'grey':'white' , color:props.mode === 'dark'? 'white':'#042743'}}
            id="myBox"
            rows="8"
          ></textarea>
        </div>

        {/* btn-1 */}
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>

        {/* btn-2 */}
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>

        {/* btn-3 */}
        <button className="btn btn-primary mx-1" onClick={handleAltClick}>
          AlTeRnAtE tExT
        </button>

        {/* btn-4 */}
        <button
          className="btn btn-primary mx-1"
          onClick={() => {
            handleCpyTextClick();
          }}
        >
          Copy Text to clipboard
        </button>

        {/* btn-5 */}
        <button className="btn btn-primary mx-1" onClick={speak}>
          Speak
        </button>

        {/* btn-6 */}
        <button className="btn btn-primary mx-1" onClick={handleClrClick}>
          Clear
        </button>
      </div>

      {/* summary */}
      <div className="container my-2" style={{color: props.mode === 'dark'? 'white':'#042743'}}>
        <h2>Your Text Summary</h2>
        {text.length > 1 ? (
          <p>
            {text.split(" ").length} Words, {text.length} Characters
            <p>{0.008 * text.split(" ").length} Minutes to Read</p>
          </p>
        ) : (
          "0 words"
        )}
        {/* <p>{text.split(" ").length} Words, {text.length} Characters</p> */}
        <h2>Preview</h2>
        <p>{text.length>0 ? text : 'Enter some text in above textbox to preview here'}</p>
      </div>
    </>
  );
}

export default TextForm;
