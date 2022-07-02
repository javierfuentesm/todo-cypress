import uuidv4 from "uuid/v4";

const TODO_STORAGE_KEY = "react_todo_ids";

export default {
  getTodoIds() {
    const todoIds = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];

    return todoIds;
  },
  getTodos() {
    const todoIds = this.getTodoIds();

    const todos = todoIds.map((id) => {
      return this.getTodo(id);
    });

    return todos;
  },
  getTodo(id) {
    const todo = JSON.parse(localStorage.getItem(id));
    return todo;
  },
  saveTodoIds(ids) {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(ids));
  },
  saveTodo(todo) {
    const newId = uuidv4();
    todo.id = newId;

    const todoIds = this.getTodoIds();
    todoIds.push(newId);

    localStorage.setItem(todo.id, JSON.stringify(todo));
    this.saveTodoIds(todoIds);
  },
  updateTodo(id, todo) {
    localStorage.setItem(id, JSON.stringify(todo));
  },
  removeTodo(id) {
    const todoIds = this.getTodoIds().filter((tid) => tid !== id);
    this.saveTodoIds(todoIds);

    localStorage.removeItem(id);
  }
};
