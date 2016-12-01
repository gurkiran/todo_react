function List (props) {
    const {todos, onSetTodo} = props;
    return (
        <ul>
        {todos.map(todo => 
            <li key={todo.id}>
                <label>
                    <input type='checkbox' checked={todo.isCompleted} onChange={ e => onSetTodo(todo, e.target.checked)} />
                    {todo.isCompleted 
                        ? <del>{todo.text}</del> 
                        : todo.text }  
                </label>
            </li>)} 
        </ul>
    );
}

class Todo extends React.Component {
    constructor(props) {
        super(props);

         this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit (e) {
        console.log(this);
        e.preventDefault();
        const todotext = this._newTodoText.value.trim();
        if(todotext.length === 0) {
            return;
        }
        
        this._newTodoText.value = '';

        this.props.onAddTodo(todotext);

    }

    focusInput () {
        this._newTodoText.focus();
    }

    render() {
        return (
            <form onSubmit = {this._onSubmit}>
                <input type='text' ref={ input => this._newTodoText = input }/>
                <button>Add Todo</button>
            </form>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.id = 1;
        this.state = {
            filter : { showCompleted : true },
            todos : [
                {id: this.id++ ,text : 'blegh', isCompleted : true},
                {id: this.id++ ,text : 'hello', isCompleted : false},
                {id: this.id++ ,text : 'oinky', isCompleted : true},
                {id: this.id++ ,text : 'blegh2', isCompleted : false}
            ] 
        }

        this._handleCheck = this._handleCheck.bind(this);
        this._onSetTodo = this._onSetTodo.bind(this);
        this._onAddTodo = this._onAddTodo.bind(this);
    }



    _handleCheck (e) {
        this.setState({
            filter : {showCompleted : e.target.checked}
        })
    }

    _onSetTodo(todo, isCompleted) {
        const {todos} = this.state;
        const newTodos = todos.map(oldTodo =>{
            if(oldTodo.id != todo.id)
                return oldTodo;
            
            return Object.assign({}, oldTodo, {isCompleted})
              
        });
        this.setState({
            todos: newTodos
        });
      
    }

    _onAddTodo(text) {
        this.setState({
            todos: this.state.todos.concat({
                id: this.id++,
                text,
                isCompleted: false
            })
        })
    }

    componentDidMount () {
        this._form.focusInput();
    }

    render() {
        const {filter, todos} = this.state;
        const filteredTodos = filter.showCompleted 
            ? todos 
            : todos.filter(todo => !todo.isCompleted)
        return (
            <div className='site-wrap'>
                <h1>Begin adding todos ...</h1>
                <label>Show completed<input type='checkbox' checked = {filter.showCompleted} onChange = {this._handleCheck}/></label>
                <List todos={filteredTodos} onSetTodo= {this._onSetTodo}/>
                <Todo onAddTodo={this._onAddTodo} ref={form => this._form = form} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('entry'));