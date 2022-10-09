import React from 'react';

export default function Todolist(props) {



    return(
        <div>
      <table>
        <tbody>
            
            <tr><td>Date</td><td>Description</td></tr>
          {
            props.todos.map((todo, index) => 
              <tr key={index}>
                <td>{todo.date}</td>
                <td>{todo.desc}</td>
              </tr>
            )
          }
        </tbody>
      </table>
        </div>
    );
}