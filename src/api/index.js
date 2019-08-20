import * as base from './base';

export function login() {
  return base.post('/admin');
}

export function find() {
  return base.post('/admin');
}