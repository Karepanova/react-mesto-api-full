import { Link } from 'react-router-dom';
import PageForm from './PageForm';

function Register({ onRegister }) {
  return (
   <PageForm
    title="Регистрация"
    submitBtnText="Зарегистрироваться"
    onSubmit={onRegister}
   >
     <Link to="/sign-in" className="login-form__link">
       Уже зарегистрированы? Войти
     </Link>
   </PageForm>
  );
}

export default Register;