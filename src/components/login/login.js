import React from 'react';
import './login.css';

function login() {
  return (
    <form class="login-welcome-row">
        <div class="login-welcome-row">
            <a href="#" title="logo">
                <img src="assets/logo.svg" alt= "logo" class="logo"></img>
            </a>
            <h1>you must signin to joint</h1>
        </div>
        <div class ="socials-row">
            <a href="#"title="Use Google">
                <img src="assets/google.png"alt="Google">signin with Goggle</img>
            </a>
            <a href="#"title="Use Apple">
                <img src ="assets/apple.svg" alt="Apple"></img>
                sign in wit Apple
            </a>
        </div>
        <div class="lines">
            <div class="line"></div>
            OR
            <div class="line"></div>
        </div>   
        <div>
            <div class="text-field">
                <label for="email">Email</label>
                <input></input></div></div> 
    </form>

  );
}

export default login;
