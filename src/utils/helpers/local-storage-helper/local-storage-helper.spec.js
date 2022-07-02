import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LocalStorageHelper from './local-storage-helper';

Enzyme.configure({ adapter: new Adapter() });

// mocking the localstorage for testing to keep separate from
// standard localstorage values.
const mockLocalStorage = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

const TODO_STORAGE_KEY = 'react_todo_ids';
const ids = ['1234-5678', '2345-6789', '3456-7891'];

const todo1 = {
  id: '1234-5678',
  title: 'todo 1 title',
  description: 'todo 1 description',
  complete: false
};
const todo2 = {
  id: '2345-6789',
  title: 'todo 2 title',
  description: 'todo 2 description',
  complete: false
};
const todo3 = {
  id: '3456-7891',
  title: 'todo 3 title',
  description: 'todo 3 description',
  complete: false
};

describe('LocalStorageHelper', () => {

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      TODO_STORAGE_KEY,
      JSON.stringify(ids)
    );
    localStorage.setItem(
      '1234-5678',
      JSON.stringify(todo1)
    );
    localStorage.setItem(
      '2345-6789',
      JSON.stringify(todo2)
    );
    localStorage.setItem(
      '3456-7891',
      JSON.stringify(todo3)
    );
  });

  describe('getTodoIds()', () => {
    it('gets the todo ids from localstorage', () => {
      const storageIds = LocalStorageHelper.getTodoIds();

      expect(storageIds).toEqual(ids);
    });
  });

  describe('getTodos()', () => {
    it('gets the todos from localstorage', () => {
      const todos = LocalStorageHelper.getTodos();

      expect(todos).toEqual([todo1, todo2, todo3]);
    });
  });

  describe('getTodo()', () => {

  });

  describe('saveTodoIds()', () => {

  });

  describe('saveTodo()', () => {

  });

  describe('updateTodo()', () => {

  });

  describe('removeTodo()', () => {

  });
});