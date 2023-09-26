import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}
export function loginSucess(payload) {
  return {
    type: types.BOTAO_CLICADO_SUCESS,
    payload,
  };
}
export function loginFailure(payload) {
  return {
    type: types.BOTAO_CLICADO_FAILURE,
    payload,
  };
}
