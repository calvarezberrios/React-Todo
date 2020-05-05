// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

export default class TodoList extends React.Component {
    render() {
        return (
            <div className="todoList">

                {this.props.searchString.length > 0 ? <h2>Results for: "{this.props.searchString}"</h2> : null}

                <div className="tasks-header">
                    <h3>Tasks:</h3>
                    {this.props.selectedList !== "" ?
                        <TodoForm
                            newTask={this.props.newTask}
                            changeHandler={this.props.changeHandler}
                            addTask={this.props.addTask}
                            clearCompleted={this.props.clearCompleted}
                        /> : null
                    }
                </div>

                <h4>
                    {this.props.selectedList !== "" ? this.props.selectedList : "All Tasks"}:
                    {this.props.selectedList !== "" ? <button onClick={this.props.deleteList}>Delete List</button> : null}
                </h4>

                {this.props.tasks ? this.props.tasks.map(task => (
                    <Todo
                        key={task.id}
                        task={task}
                        doubleClick={this.props.doubleClickTask}
                    />
                )) : null}


            </div>
        );
    }
}
