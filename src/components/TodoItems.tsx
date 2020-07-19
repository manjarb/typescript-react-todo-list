import React from "react";
import classNames from "classnames";
import { ENTER_KEY } from "../constants";

interface IProps {
  index: number;
  title: string;
  completed: boolean;
  editing: boolean;
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDestroy: () => void;
  onEdit: () => void;
  onSave: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onCancel: () => void;
}

export const TodoItems = ({
  completed,
  editing,
  title,
  onToggle,
  onDestroy,
  onEdit,
  onSave,
  onChange,
}: IProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();
    onSave();
  };

  return (
    <li
      className={classNames({
        completed: completed,
        editing: editing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={onToggle}
        />
        <label onDoubleClick={onEdit}>{title}</label>
        <button className="destroy" onClick={onDestroy} />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onBlur={onSave}
        onChange={onChange}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </li>
  );
};
