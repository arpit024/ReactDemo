import React from 'react';


class Test extends React.Component{
    state={
        todos:[]
    }
    componentDidMount=()=>{
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then(res=>res.json())
        .then(result=>{console.log(result)
            this.setState({todos:result})
        })
    }
    handleClick=(id)=>{
                console.log(id)
                this.setState(prevState => ({
                    todos: {
                        ...prevState.todos,
                        [prevState.todos[1].name]: true,
                    },
                }));
    }
    render(){
        return(<>
        {this.state.todos.map((item,i) => (
          <li key={item.id}>
            <label>
              <input type="checkbox" checked={item.completed} 
              onChange={()=>this.handleClick(i)}/> 
              <span>{item.title}</span>
            </label>
          </li>
        ))}
        </>)
    }
}
export default Test