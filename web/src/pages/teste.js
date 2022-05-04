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
      <input type="text" name="nomeUsuario" />
      <label>Email</label>
      <input type="email" name="email" />
      <input type="submit" value="Send" />
        </form>
  );
};