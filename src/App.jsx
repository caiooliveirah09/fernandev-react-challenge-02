import { login } from './utils';
import './index.css';
import { useEffect, useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login enquanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isDisabled, setDisabled] = useState(true);
  const [errei, setErrei] = useState('');
  const handlePassword = ({target}) => {
    setPassword(target.value);
  }

  const handleEmail = ({target}) => {
    setEmail(target.value);
  }

  const handleLogin = async () => {
    setErrei('');
    try {
      setDisabled(true);
      await login({ email, password });
      alert('deu boa');
    } catch (error) {
      setErrei(error.message);
    };
    setDisabled(false);
  }

  useEffect(() => {
    if(email && password && password.length >= 6){
      setDisabled(false)
    } else { setDisabled(true) }
  }, [email, password])

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        { errei && <div className='errorMessage'> { errei } </div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id={'email'} type={'email'} autoComplete='off' onChange={handleEmail}/>
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} onChange={handlePassword}/>
        </div>

        <div className='button'>
          <button disabled={ isDisabled } onClick={ handleLogin }>Login</button>
        </div>
      </div>
    </div>
  );
}
