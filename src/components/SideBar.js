import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = styled.div`
  
  width: 20%;
  min-width: 250px;
  height: 100vh;
  background: #888;
  padding: 15px;
  border-right: 1px outset #999;
  color: #ddd;
  font-size: 20px;
  overflow-y: auto;

  h2 {
    margin: 0;
    padding: 0;
    color: gold;
  }

  h3 {
    text-decoration: underline;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  button {
    border-radius: 6px;
    background: #666;
    color: #aaa;
    border: 1px outset #888;
    padding: 0 6px;
    cursor: pointer;

    &:active {
      border: 1px inset #888;
    }

    &:focus {
      outline: none;
    }
  }

  .searchContainer {
    margin-top: 20px;
    width: 100%;

    label {
      background: #aaa;
      border: 1px inset #999;
      padding: 4px 5px;
      border-radius: 4px;
      color: #ddd;

      input {
        border: none;
        width: 80%;
        background: none;
        color: #ddd;
        font-size: 14px;

        &::placeholder {
          color: #ddd;
          font-size: 14px;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }

  .lists {
    margin-top: 20px;

    li {
      cursor: pointer;
      list-style: none;
      line-height: 1.5;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .showAll {
    margin-top: 20px;
    border: none;
    padding: 14px 12px;
    border-radius: 6px;
    background: #666;
    color: #aaa;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      border: 1px inset #888;
      margin-top: 18px;
    }

    &:focus {
      outline: none;
    }
  }
`;

export default class SideBar extends React.Component {
    render() {
        return (
            <Sidebar>
                <h2>Reminders</h2>

                <div className="searchContainer">
                    <label htmlFor="search" onClick={() => document.querySelector("#search").click()}>
                        {/* <span role = "img" aria-label = "magnifier">&#128269;</span> */}
                        <FontAwesomeIcon icon="search" />{" "}
                        <input id="search" type="text" value={this.props.searchString} placeholder="Search" onChange={this.props.searchInputChange} />
                    </label>
                </div>

                <button className="showAll" onClick={this.props.showAllTasks}>All Tasks </button>

                <div className="lists">
                    <h3>To Do Lists: <button onClick={this.props.newList}><FontAwesomeIcon icon="plus" /></button></h3>
                    {this.props.tasksLists.map((list, index) => (
                        <li key={index} onClick={this.props.selectList}>
                            {list}
                        </li>
                    ))}
                </div>



            </Sidebar>
        );
    }
}