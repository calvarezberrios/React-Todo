import React from 'react';
import TodoList from "./components/TodoList";
import SideBar from "./components/SideBar";

//localStorage.setItem("tasks", "");
const savedTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : null;

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor() {
    super();
    this.state = {
      tasks: savedTasks ? savedTasks : {},
      newTask: {
        task: "",
        id: Date.now(),
        completed: false
      },
      searchString: "",
      searchResults: [],
      selectedList: "", 
      tasksLists: []
    }
  }

  changeHandler = e => {
    this.setState({
      newTask: 
      {...this.state.newTask, 
        task: e.target.value
      }
    });
  }

  addTask = e => {
    e.preventDefault();

    if(this.state.newTask.task !== "") {
    
      if(this.state.selectedList !== ""){
        this.setState({
          tasks: 
          {
            ...this.state.tasks,
            [this.state.selectedList.toLowerCase()]:
            [...this.state.tasks[this.state.selectedList.toLowerCase()], this.state.newTask]
          }
        }, () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks)));
        
        this.setState({newTask: {
          task: "",
          id: Date.now(),
          completed: false
        }});
      } 
    }
  }

  doubleClickTask = e => {
    
    e.target.classList.toggle("completed");

    const targetId = Number(e.target.id);
    

    for (let [, value] of Object.entries(this.state.tasks)) {
      value.forEach(task => {
        if(task.id === targetId) {
          task.completed = !task.completed;
        }
      })
    }

    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    
  }

  clearCompleted = e => {
    e.preventDefault();

    this.setState({
      tasks: {
          ...this.state.tasks,
          [this.state.selectedList.toLowerCase()]:
          this.state.tasks[this.state.selectedList.toLowerCase()].filter(task => !task.completed)
      }
    }, () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks)));
  }
  
  searchInputChange = e => {
    this.setState({searchString: e.target.value});
    this.showAllTasks();
  }

  selectList = e => {
    const selected = e.target.textContent;
    this.setState({selectedList: selected});
    this.setState({searchResults: this.state.tasks[selected.toLowerCase()]})
  }

  showAllTasks = () => {
    const allTasks = [];
    
    for (let [key] of Object.entries(this.state.tasks)) {
      this.state.tasks[key].forEach(task => allTasks.push(task))
      this.setState({searchResults: allTasks})
    }

    this.setState({selectedList: ""});
  }

  newList = () => {
    const name = prompt("Enter a name for the new list");

    if(name !== "" && name !== null){
      this.setState({
        tasks: {
          ...this.state.tasks,
          [name.toLowerCase()]: []
        } 
      }, () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks)));
    }
  }
  
  deleteList = () => {
    this.setState({searchResults: []})
    delete this.state.tasks[this.state.selectedList.toLowerCase()];

    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    this.showAllTasks();
    this.getTasksLists();

  }

  getSearchResults = () => {
    const newResults = this.state.searchResults.filter(task => task.task.toLowerCase().includes(this.state.searchString.toLowerCase()));

    this.setState({searchResults: newResults});
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.state.searchString !== prevState.searchString) {
      if(this.state.searchString !== ""){

        this.getSearchResults()
      } else {
        this.showAllTasks();
      }
    }     
      
    

    if(this.state.tasks !== prevState.tasks) {


      this.setState({searchResults: this.state.tasks[this.state.selectedList.toLowerCase()]})
      
      this.getTasksLists();
    }
  }

  getTasksLists = () => {
    let newTasksList = [];

    for(let [key] of Object.entries(this.state.tasks)){

      let stringArray = key.split(" ");
      stringArray.forEach((string, index) => stringArray[index] = string[0].toUpperCase() + string.slice(1));
      stringArray = stringArray.join(" ");

      newTasksList.push(stringArray);
      
    }
    
    this.setState({tasksLists: newTasksList});
  }

  componentDidMount() {
    this.showAllTasks();
    this.getTasksLists();    
  }

  render() {

    return (
      <div id = "app-container">
        <SideBar 
          searchString = {this.state.searchString}
          searchInputChange = {this.searchInputChange}
          selectList = {this.selectList}
          showAllTasks = {this.showAllTasks}
          tasksLists = {this.state.tasksLists}
          newList = {this.newList}
        />
        
        <div className = "tasks-container">
          <TodoList tasks = {this.state.searchResults} 
            selectedList = {this.state.selectedList}
            doubleClickTask = {this.doubleClickTask}
            searchString = {this.state.searchString}
            newTask = {this.state.newTask} 
            changeHandler = {this.changeHandler} 
            addTask = {this.addTask} 
            clearCompleted = {this.clearCompleted}
            deleteList = {this.deleteList}
          />
        </div>
      </div>
    );
  }
}

export default App;
