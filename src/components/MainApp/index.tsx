import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';


type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}


type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
}

//в чем необходимость необходимость этот тип объявлять ?
type MainAppState = {
    todoTitle: string
};


//неймниг поменять
// в целом не понятен подход использования классовых и функциональных компонентов лучше зарефакторить все в функциональный стиль.
class Index extends React.Component<MainAppProps, MainAppState> {
    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' }
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }

    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }

    render() {
        const { todoTitle } = this.state;

        // window ???? если нам нужны доп пропсы можно воспользоватся state
        window.allTodosIsDone = true;

        //window ??? нужно удалить и переписать весь кусок где это используется , через какой нить фильтр и мемоизацию что бы каждый раз не считалось
        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false
            } else {
                window.allTodosIsDone = true
            }
        });

        // неконсистентный подход к компоненту, на мой взгляд нужно убрать всю верстку отсюда и декомпозировать все на отдельные компоненты
        // не использовать нейминги переменных типа одной буквы t,q,w сильно понижает читаемость кода
        return (
            <div>
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr/>
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {this.props.todos.map((t, idx) => (
                    //все что ниже вынести в отдельный компонент
                    <div className={styles.todo} >
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        <Form.Check
                            // использование инлайн стилей убрать вынести в css
                            style={{ marginTop: -8, marginLeft: 5 }}
                            // функцию onChange вынести отдельно и оптимизировать отдельная функция хендлер где логика
                            // и в конце в экшен(где диспатч) уже пробрасывать только результат
                            type="checkbox" checked={t.isDone} onChange={(e) => {
                            const changedTodos = this.props.todos.map((t, index) => {
                                //зачем это ?
                                const res = { ...t }
                                // и это ?
                                if (index == idx) {
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            this.props.changeTodo(changedTodos)

                        }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    //нужно вынести в отдельный файл для повышение читаемости все экшены
    (dispatch) => ({
        //any убрать
        addTodo: (todo: any) => {
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        // странная логика не понятно, зачем прокидывать toods ?
        // any убрать
        changeTodo: (todos: any) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })
//нейминг поменять
)(Index);
