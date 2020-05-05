import React from "react";
import styled from "styled-components";

const Form = styled.form`
  input {
    background: none;
    border: 1px solid #888;
    padding: 4px;
    color: #ddd;

    &::placeholder {
      color: #ddd;
    }

    &:focus {
      outline: none;
      border: 1px inset #888;
      background: #777;
    }
  }

  button {
    background: #444;
    border: 1px outset #777;
    border-radius: 4px;
    color: #aaa;
    cursor: pointer;
    font-size: 14px;

    &:active {
      border: 1px inset #777;
    }
  }
`;

export default class TodoForm extends React.Component {

    render() {
        return (
            <Form onSubmit={this.props.addTask}>
                <input
                    id="task"
                    type="text"
                    value={this.props.newTask.task}
                    onChange={this.props.changeHandler}
                    placeholder="Enter new task"
                />

                {" "}<button type="submit">+</button>{" "}
                <button onClick={this.props.clearCompleted}>
                    Clear Completed
        </button>
            </Form>
        );
    }
}