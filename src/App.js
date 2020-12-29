import React, { useState } from 'react';
import './App.css';
import fireBase from './Firebase'

function useInput(initialValue){
   const [value,setValue] = useState(initialValue);

    function handleChange(e){
        setValue(e.target.value);
    }

   return [value,handleChange];
}

function App() {
  const [name, setName] = useInput("")
  const [email, setEmail] = useInput("")
  const [message, setMessage] = useInput("")
  const [submitted, setSubmitted] = useState(false)

  
  function handleSubmit(e){
    e.preventDefault()
    console.log(name, email, message)
    
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
    saveMessage(name, email, message)
  }

  function saveMessage(name, email, message){
    let contactRef = fireBase.database().ref('contact-form')
    var newMsgRef = contactRef.push()
    newMsgRef.set({
      name: name,
      email: email,
      message: message
    })
  }
  
  return (
      <form>
        <h2>Contact Me</h2>
        {submitted ? <p className="result"> Successfully submitted !!</p> : null}
        <label type="Name:">
        <input 
        placeholder="Your Name" 
        value={name} 
        onChange={setName}
        />
        </label>
        <label type="Email:">
        <input 
        placeholder="Your Email"
        value={email}
        onChange={setEmail}
        />
        </label>
        <label type="Message:">
        <input 
        placeholder="Type your message here..."
        value={message}
        onChange={setMessage}
        />
        </label>
        <button onClick={handleSubmit}>Send Message</button>
        <div className="info">
          <span className="fa fa-phone"></span>+1 456 654 5674
          <span className="fa fa-envelope-o"></span> hi@personal.me
        </div>
      </form>
  );
}

export default App;
