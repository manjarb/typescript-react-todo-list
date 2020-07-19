import React from "react";
import "./App.css";
import {
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS,
  ENTER_KEY,
} from "./constants";
import { Utils } from "./helper/utils";
import { TodoItems } from "./components/TodoItems";
import { TodoFooter } from "./components/TodoFooter";

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
      list.completed = e.target.checked;
      return list;
    });

    this.setState({
      todoList: checkedList,
    });
  };

  toggle = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { todoList } = this.state;
    todoList[index].completed = e.target.checked;
    this.setState({
      todoList,
    });
  };

  destroy = (index: number) => {
    const { todoList } = this.state;
    todoList.splice(index, 1);
    this.setState({
      todoList,
    });
  };

  edit = (id: string) => {
    this.setState({
      editing: id,
    });
  };

  save = () => {
    this.setState({
      editing: null,
    });
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { todoList } = this.state;
    todoList[index].title = e.target.value;
    this.setState({
      todoList,
    });
  };

  onFooterSelect = (showing: string) => {
    this.setState({
      nowShowing: showing,
    });
  };

  get activeTodoCount(): number {
    return this.state.todoList.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);
  }

  render() {
    const { todoList, editing, nowShowing } = this.state;

    const shownTodos = todoList.filter((todo) => {
      switch (nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });

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
          <div>
            <section className="main">
              <input
                id="toggle-all"
                type="checkbox"
                className="toggle-all"
                onChange={this.toggleAll}
                checked={this.activeTodoCount === 0}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
              <ul className="todo-list">
                {shownTodos.map((todo, index) => (
                  <TodoItems
                    key={todo.id}
                    index={index}
                    title={todo.title}
                    completed={todo.completed}
                    editing={editing === todo.id}
                    onToggle={(e) => this.toggle(e, index)}
                    onDestroy={() => this.destroy(index)}
                    onEdit={() => this.edit(todo.id)}
                    onSave={this.save}
                    onChange={(e) => this.onChange(e, index)}
                  />
                ))}
              </ul>
            </section>
            <TodoFooter
              count={todoList.length}
              nowShowing={nowShowing}
              onSelect={this.onFooterSelect}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TodoApp;
