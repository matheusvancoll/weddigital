import React, { useRef } from 'react';
import emailjs from 'emailjs-com'

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_5tqqlsa', 'template_x9le1nm', form.current, 'XKOIdqt9WWgiZGPAc')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
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