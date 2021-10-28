import PageForm from './PageForm';

function Login({ onLogin }) {
  return <PageForm title="Вход" submitBtnText="Войти" onSubmit={onLogin} />;
}

export default Login;