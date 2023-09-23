import React from 'react';
import { useDispatch } from 'react-redux';
// import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Title } from './styled';
import * as exempleActions from '../../store/modules/example/actions';

export default function Login() {
  /*
  React.useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      const { data } = response;
      console.log(data);
    }
    getData();
  }, []);
  */
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(exempleActions.clicaBotaoRequest());
  }

  return (
    <Container>
      <Title>
        Login
        <small>Olá</small>
      </Title>
      <p>Lorem ipsum dolor site amet.</p>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
