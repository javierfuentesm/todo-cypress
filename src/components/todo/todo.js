import React from "react";
import PropTypes from "prop-types";
import LocalStorageHelper from '../../utils/helpers/local-storage-helper';
import { Button, ButtonGroup, Container, Row, Col } from 'reactstrap';

class Todo extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    complete: PropTypes.bool
  };

  state = {
    complete: this.props.complete
  }

  completeTodo = (e) => {
    let todo = LocalStorageHelper.getTodo(e.target.id);
    todo.complete = !todo.complete;
    LocalStorageHelper.updateTodo(todo.id, todo);

    this.setState(previousState => ({
      complete: !previousState.complete
    }));
  }

  render() {
    const {id, title, description} = this.props;
    const {complete} = this.state;

    let button = null;
    let classNames = 'todo';
    if(complete){
      classNames = 'todo complete'
      button = (
        <Button
          color="success"
          id={id}
          onClick={this.completeTodo}
        >
          Completed
        </Button>
      );
    } else {
      button = (
        <Button
          color="secondary"
          id={id}
          onClick={this.completeTodo}
        >
          Complete
        </Button>
      );
    }

    return (
      <Container className={classNames}>
        <Row>
          <Col>
            <ButtonGroup>
              {button}
            </ButtonGroup>
          </Col>
          <Col>
            <p className='title'>{title}</p>
            <p className='description'>{description}</p>
          </Col>
          <Col>
            {this.props.children}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Todo;
