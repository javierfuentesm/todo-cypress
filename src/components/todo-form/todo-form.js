import React from "react";
import PropTypes from "prop-types";
import LocalStorageHelper from '../../utils/helpers/local-storage-helper';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class TodoForm extends React.Component {
  state = {
    title: '',
    description: ''
  }

  static propTypes = {
    addTodo: PropTypes.func
  }

  handleInputChange = (event) => {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });
  }

  saveTodo = () => {
    const todo = {
      title: this.state.title,
      description: this.state.description,
      complete: false
    };

    LocalStorageHelper.saveTodo(todo);

    this.setState({title: '', description: ''});
    this.props.addTodo(todo);
  }

  render() {
    return (
      <div className='newTodoForm'>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              onChange={this.handleInputChange}
              value={this.state.title}
              autoComplete='off'
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              onChange={this.handleInputChange}
              value={this.state.description}
            />
          </FormGroup>
        </Form>
        <Button color='success' onClick={this.saveTodo}>Create</Button>
      </div>
    );
  }
}

export default TodoForm;
