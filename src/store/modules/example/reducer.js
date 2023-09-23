/* eslint-disable func-names */
/* eslint-disable default-param-last */
import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCESS: {
      console.log('Sucesso!');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log('Deu erro =(');
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log('estou fazendo a requisição');
      return state;
    }

    default: {
      return state;
    }
  }
}
