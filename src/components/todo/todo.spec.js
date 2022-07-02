import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LocalStorageHelper from '../../utils/helpers/local-storage-helper';
import Todo from '../todo';
import { Button, ButtonGroup, Container, Col } from 'reactstrap';

Enzyme.configure({ adapter: new Adapter() });

describe('Todo', () => {
  let wrapper;
  const incompleteTodo = {
    id: '1234-5678',
    title: 'incomplete todo',
    description: 'incomplete description',
    complete: false
  };
  const completeTodo = {
    id: '2345-6789',
    title: 'complete todo',
    description: 'complete description',
    complete: true
  };
  let incompleteTodoInStorage = {
    id: '3456-7890',
    title: 'todo from localStorage title',
    description: 'todo from localStorage description',
    complete: false
  };
  let completeTodoInStorage = {
    id: '4567-8910',
    title: 'todo from localStorage title',
    description: 'todo from localStorage description',
    complete: true
  };
  const removeFunc = jest.fn();

  describe('when the todo is not complete', () => {
    beforeEach(() => {
      incompleteTodoInStorage.complete = false;
      completeTodoInStorage.complete = true;

      LocalStorageHelper.getTodo = jest.fn().mockReturnValue(incompleteTodoInStorage);
      LocalStorageHelper.updateTodo = jest.fn();

      wrapper = shallow(
        <Todo
          id={incompleteTodo.id}
          title={incompleteTodo.title}
          description={incompleteTodo.description}
          complete={incompleteTodo.complete}
        >
          <Button color="danger" id={incompleteTodo.id} onClick={removeFunc}>Remove</Button>
        </ Todo>
      );
    });

    describe('completeTodo()', () => {
      const e = {
        target: {
          id: incompleteTodoInStorage.id
        }
      };

      it('gets the todo from localstorage', () => {
        wrapper.instance().completeTodo(e);

        expect(LocalStorageHelper.getTodo).toHaveBeenCalledWith('3456-7890');
      });

      it('marks the todo as complete', () => {
        // check complete is false before calling the function.
        expect(incompleteTodoInStorage.complete).toEqual(false);
        wrapper.instance().completeTodo(e);
        // check that complete has been changed to true.
        expect(incompleteTodoInStorage.complete).toEqual(true);
      });

      it('updates the todo in localstorage', () => {
        wrapper.instance().completeTodo(e);

        expect(LocalStorageHelper.updateTodo).toHaveBeenCalled();
      });

      it('updates the complete state', () => {
        // check complete is false before calling the function.
        expect(wrapper.instance().state.complete).toEqual(false);
        wrapper.instance().completeTodo(e);
        // check that complete has been changed to true.
        expect(wrapper.instance().state.complete).toEqual(true);
      });
    });

    describe('render', () => {
      it('uses the correct classnames for the todo', () => {
        const container = wrapper.find(Container);

        expect(container.props().className).toEqual('todo');
      });

      it('renders the 3 columns', () => {
        const columns = wrapper.find(Col);
        expect(columns.length).toEqual(3);
      });

      describe('first column', () => {
        it('renders the complete button', () => {
          const columns = wrapper.find(Col);
          const firstColumn = columns.at(0);

          const buttonGroup = firstColumn.find(ButtonGroup);
          const button = firstColumn.find(Button);

          expect(buttonGroup.length).toEqual(1);
          expect(button.length).toEqual(1);
          expect(button.props().children).toEqual('Complete');
          expect(button.props().color).toEqual('secondary');
        });
      });

      describe('second column', () => {
        it('renders the todo contents', () => {
          const columns = wrapper.find(Col);
          const secondColumn = columns.at(1);

          const title = secondColumn.find('p.title');
          const description = secondColumn.find('p.description');

          expect(title.props().children).toEqual('incomplete todo');
          expect(description.props().children).toEqual('incomplete description');
        });
      });

      describe('third column', () => {
        it('renders the children', () => {
          const columns = wrapper.find(Col);
          const thirdColumn = columns.at(2);

          const button = thirdColumn.find(Button);

          expect(button.length).toEqual(1);
          expect(button.props().children).toEqual('Remove');
          expect(button.props().color).toEqual('danger');
          expect(button.props().onClick).toEqual(removeFunc);
          expect(button.props().id).toEqual('1234-5678');
        });
      });
    });
  });

  describe('when the todo is complete', () => {
    beforeEach(() => {
      incompleteTodoInStorage.complete = false;
      completeTodoInStorage.complete = true;

      LocalStorageHelper.getTodo = jest.fn().mockReturnValue(completeTodoInStorage);
      LocalStorageHelper.updateTodo = jest.fn();

      wrapper = shallow(
        <Todo
          id={completeTodo.id}
          title={completeTodo.title}
          description={completeTodo.description}
          complete={completeTodo.complete}
        >
          <Button color="danger" id={completeTodo.id} onClick={removeFunc}>Remove</Button>
        </ Todo>
      );
    });

    describe('completeTodo()', () => {
      const e = {
        target: {
          id: completeTodoInStorage.id
        }
      };

      it('gets the todo from localstorage', () => {
        wrapper.instance().completeTodo(e);

        expect(LocalStorageHelper.getTodo).toHaveBeenCalledWith('4567-8910');
      });

      it('marks the todo as incomplete', () => {
        // check complete is true before calling the function.
        expect(completeTodoInStorage.complete).toEqual(true);
        wrapper.instance().completeTodo(e);
        // check that complete has been changed to false.
        expect(completeTodoInStorage.complete).toEqual(false);
      });

      it('updates the todo in localstorage', () => {
        wrapper.instance().completeTodo(e);

        expect(LocalStorageHelper.updateTodo).toHaveBeenCalled();
      });

      it('updates the complete state', () => {
        // check complete is true before calling the function.
        expect(wrapper.instance().state.complete).toEqual(true);
        wrapper.instance().completeTodo(e);
        // check that complete has been changed to false.
        expect(wrapper.instance().state.complete).toEqual(false);
      });
    });

    describe('render', () => {
      it('uses the correct classnames for the todo', () => {
        const container = wrapper.find(Container);

        expect(container.props().className).toEqual('todo complete');
      });

      it('renders the 3 columns', () => {
        const columns = wrapper.find(Col);
        expect(columns.length).toEqual(3);
      });

      describe('first column', () => {
        it('renders the complete button', () => {
          const columns = wrapper.find(Col);
          const firstColumn = columns.at(0);

          const buttonGroup = firstColumn.find(ButtonGroup);
          const button = firstColumn.find(Button);

          expect(buttonGroup.length).toEqual(1);
          expect(button.length).toEqual(1);
          expect(button.props().children).toEqual('Completed');
          expect(button.props().color).toEqual('success');
        });
      });

      describe('second column', () => {
        it('renders the todo contents', () => {
          const columns = wrapper.find(Col);
          const secondColumn = columns.at(1);

          const title = secondColumn.find('p.title');
          const description = secondColumn.find('p.description');

          expect(title.props().children).toEqual('complete todo');
          expect(description.props().children).toEqual('complete description');
        });
      });

      describe('third column', () => {
        it('renders the children', () => {
          const columns = wrapper.find(Col);
          const thirdColumn = columns.at(2);

          const button = thirdColumn.find(Button);

          expect(button.length).toEqual(1);
          expect(button.props().children).toEqual('Remove');
          expect(button.props().color).toEqual('danger');
          expect(button.props().onClick).toEqual(removeFunc);
          expect(button.props().id).toEqual('2345-6789');
        });
      });
    });
  });
});