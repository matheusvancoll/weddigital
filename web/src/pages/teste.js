import React, { useRef } from 'react';
import emailjs from 'emailjs-com'

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_dbbp6yf', 'template_44kjgsh', form.current, 'nRkUn8RqboquqFSTd')
      .then((result) => {
          alert("DEU BOM")
          console.log(result.text);
      }, (error) => {
          alert("DEU ERRO")
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="emailparam" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />

      <div class="input-group">
        <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
        <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
        </div>
        <script async src="https://imgbb.com/upload.js"></script>
        </form>
  );
};