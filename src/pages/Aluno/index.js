/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const dispacth = useDispatch();
  const id = get(match, 'params.id', 0);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 50) {
      formErrors = true;
      toast.error('Nome precisa ter entre 3 e 50 caracteres.');
    }

    if (sobrenome.length < 3 || sobrenome.length > 50) {
      formErrors = true;
      toast.error('Sobrenome precisa ter entre 3 e 50 caracteres.');
    }

    if (!isEmail(email)) {
      toast.error('E-mail inválido');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error('Idade inválida');
    }
    if (!isFloat(String(peso))) {
      toast.error('Peso inválido');
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura inválida');
      formErrors = true;
    }

    if (formErrors);

    try {
      setIsLoading(true);
      if (id) {
        // editando
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno editado com sucesso!');
      } else {
        // criando
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno cadastrado com sucesso!');
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      // caso token expirou
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro deconhecido');
      }

      if (status === 401) dispacth(actions.loginRequest());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar aluno' : 'Novo aluno'}</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="nome"
        />

        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="sobrenome"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="idade"
        />

        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="peso"
        />

        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
