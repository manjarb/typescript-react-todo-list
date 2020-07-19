import React from "react";
import classNames from "classnames";

import { Utils } from "../helper/utils";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "../constants";

interface IProps {
  count: number;
  nowShowing: string;
  onSelect: (showing: string) => void;
}

export const TodoFooter = ({ count, nowShowing, onSelect }: IProps) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {Utils.pluralize(count, "item")} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            onClick={() => onSelect(ALL_TODOS)}
            className={classNames({ selected: nowShowing === ALL_TODOS })}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            onClick={() => onSelect(ACTIVE_TODOS)}
            className={classNames({ selected: nowShowing === ACTIVE_TODOS })}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            onClick={() => onSelect(COMPLETED_TODOS)}
            className={classNames({ selected: nowShowing === COMPLETED_TODOS })}
          >
            Completed
          </a>
        </li>
      </ul>
    </footer>
  );
};
