import React from 'react';
import PropTypes from 'prop-types';
import LocalStorageHelper from '../../utils/helpers/local-storage-helper';
import { Button } from 'reactstrap';
import Todo from '../todo';

class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.array,
    removeTodo: PropTypes.func
  }

  static defaultProps = {
    todos: []
  }

  removeTodo = (e) => {
    this.props.removeTodo(e.target.id);
  }

  renderTodoRows(todos) {
    return todos.map((todo, index) => {
      return (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          complete={todo.complete}
        >
          <Button color="danger" id={todo.id} onClick={this.removeTodo}>Remove</Button>
        </Todo>
      );
    });
  }

  render() {
    const {todos} = this.props;

    return (
      <div>
        <div className='todos'>
          {this.renderTodoRows(todos)}
        </div>
      </div>
    );
  }
}

export default TodoList;
