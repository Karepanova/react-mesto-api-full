import headerLogo from "../images/header-logo.svg";
import React from "react";
import { Link, useLocation } from 'react-router-dom'; //useLocation

function Header({ userEmail, loggedIn, onSignOut }) {
 const { pathname } = useLocation();

 const url = pathname === '/sign-up' ? '/sign-in' : pathname === '/sign-in' ? '/sign-up' : '';
 const text = pathname === '/sign-up' ? 'Войти' : pathname === '/sign-in' ? 'Регистрация' : '';

 return (
  <header className="header">
   <img alt="Лого" className="header__logo" src={headerLogo} />

   <div className="header__user-status">
    <p className="header__email">{userEmail}</p>
    {loggedIn ? (
     <Link to="/" className="header__link" onClick={onSignOut}>
      Выйти
     </Link>
    ) : (
     <Link to={url} className="header__link">
      {text}
     </Link>
    )}
   </div>
  </header>
 );
}
export default Header;