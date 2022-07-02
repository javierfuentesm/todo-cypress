import React from "react";
import ReactDOM from "react-dom";
import LocalStorageHelper from "./utils/helpers/local-storage-helper";
import TodoList from "./components/todo-list";
import TodoForm from "./components/todo-form";
import { Container, Row, Col } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
class App extends React.Component {
  state = {
    todos: LocalStorageHelper.getTodos()
  };

  addTodo = (todo) => {
    this.setState((previousState) => ({
      todos: [...previousState.todos, todo]
    }));
  };

  removeTodo = (id) => {
    LocalStorageHelper.removeTodo(id);
    let todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });

    this.setState({
      todos
    });
  };

  render() {
    const { todos } = this.state;

    return (
      <Container className="App">
        <Row>
          <Col>
            <h1>Todo List para Cypress</h1>
            <h2>Usando React y Localstorage!</h2>
          </Col>
        </Row>
        <TodoForm addTodo={this.addTodo} />
        <TodoList todos={todos} removeTodo={this.removeTodo} />
      </Container>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
