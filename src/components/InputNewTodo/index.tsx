import React from 'react';
import styles from './InputNewTodo.module.css'

type InputNewTodoProps = {
    todoTitle: string,
    onChange: (todoTitle: string) => void,
    onSubmit: (todo: any) => void,

}
type InputNewTodoState = {
    value: string
}

export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        if (this.props.todoTitle !== prevProps.todoTitle) {
            this.setState({value: this.props.todoTitle})
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    }

    handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();

        var val = this.state.value.trim();

        if (val) {
            this.props.onSubmit({
                title: this.state.value,
                isDone: false,
            });
            this.props.onChange('');
        }
    }

    render() {
        return (
            <input
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
