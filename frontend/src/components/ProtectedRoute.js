import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//HOC-компонент - высокого порядка -  возвращает компонент Route
//Если значение loggedIn — true, Route отрисует компонент, который передан
// HOC-компоненту как пропс, включая переданные пропсы.
// Если значение false — вернёт компонент Redirect и переадресует пользователя на страницу авторизации.

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
   <Route>
     {() =>
      props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
     }
   </Route>
  );
};

export default ProtectedRoute;