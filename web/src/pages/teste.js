import React, { useRef } from 'react';
import emailjs from 'emailjs-com'

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
      e.preventDefault();

      let inputEmail = document.getElementById('inputEmailValidacao')
      let inputNome =  document.getElementById('inputNomeValidacao')
      let inputForm =  document.getElementById('formid')

      const formData = new FormData();
      formData.append('email', inputForm);
      formData.append('email', inputEmail);
      formData.append('nomeUsuario', inputNome);

      emailjs.sendForm('service_5tqqlsa', 'template_x9le1nm', formData, 'XKOIdqt9WWgiZGPAc')
          .then((result) => {
              console.log("TRUE")
              console.log(result.text);
          }, (error) => {
              console.log("FALSE")
              console.log(error.text);
      });

      // emailjs.sendForm('service_5tqqlsa', 'template_x9le1nm', form.current, 'XKOIdqt9WWgiZGPAc')
      //   .then((result) => {
      //       console.log(result.text)
      //   }, (error) => {
      //       console.log(error.text)
      //   })
  };


  return (
      <>
          <form ref={form} onSubmit={sendEmail} id="formid">
              <label>Name</label>
              <input type="text" name="nomeUsuario" id="inputNomeValidacao" />
              <label>Email</label>
              <input type="email" name="email" id="inputEmailValidacao" />
              <input type="submit" value="Send" />
          </form>
      </>

  );
};