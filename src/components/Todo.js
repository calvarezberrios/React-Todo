import React from "react";
import "./Todo.css";

export default class Todo extends React.Component {
    render() {
        return (
            <li id={this.props.task.id} onDoubleClick={this.props.doubleClick} className={this.props.task.completed ? "completed" : null}>{this.props.task.task}</li>
        );
    }
}