import React from "react";
import "./App.css";
import {
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS,
  ENTER_KEY,
} from "./constants";
import { Utils } from "./helper/utils";

class TodoApp extends React.Component<{}, IAppState> {
  state: IAppState;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null,
      newTodoValue: "",
      todoList: [],
    };
  }

  handleNewTodoKeyDown = (event: React.KeyboardEvent): void => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const { newTodoValue, todoList } = this.state;
    if (newTodoValue) {
      const newTodo: ITodo = {
        id: Utils.uuid(),
        title: newTodoValue,
        completed: false,
      };

      const newList = todoList.concat(newTodo);
      this.setState({
        todoList: newList,
        newTodoValue: "",
      });
    }
  };

  handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      newTodoValue: e.target.value,
    });
  };

  toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { todoList } = this.state;
    if (!todoList) {
      return;
    }

    const checkedList = todoList.map((list) => {
      list.completed = true;
      return list;
    });
    this.setState({
      todoList: checkedList,
    });
  };

  get activeTodoCount(): number {
    return this.state.todoList.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);
  }

  render() {
    const { todoList } = this.state;
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleNewTodoChange}
            value={this.state.newTodoValue}
          />
        </header>

        {todoList && (
          <section className="main">
            <input
              type="checkbox"
              className="toggle-all"
              onChange={this.toggleAll}
              // checked={activeTodoCount === 0}
            />
            {this.activeTodoCount}
          </section>
        )}

        {todoList.map((list) => (
          <p>{list.title}</p>
        ))}
      </div>
    );
  }
}

export default TodoApp;
