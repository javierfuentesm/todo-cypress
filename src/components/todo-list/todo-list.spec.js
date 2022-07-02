import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import TodoList from './todo-list';
import Todo from '../todo';

Enzyme.configure({ adapter: new Adapter() });

describe('TodoList', () => {
  let wrapper;
  const todos = [
    { title: 'todo', description: 'description' },
    { title: 'todo', description: 'description' },
    { title: 'todo', description: 'description' }
  ];

  beforeEach(() => {
    wrapper = shallow(
      <TodoList todos={todos} />
    );
  });

  describe('render', () => {
    it('renders the the todos', () => {
      const todos = wrapper.find(Todo);
      expect(todos.length).toEqual(3);
    });
  });
});
