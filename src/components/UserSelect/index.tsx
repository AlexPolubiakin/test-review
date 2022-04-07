import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';

type UserSelectProps = {
    user?: number,
    idx: number,
}

//

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
    React.useEffect(
        () => {
            console.log('userSelect');
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    const [options, setOptions] = React.useState([]);

    const { idx } = props;

    // в целом подход менять todos и передавать дальше в стор уже отрадактированный вариант на мой взгляд так себе затея
    // нужно логику перенести в редюсер тк мест где мы это можем использовать может быть 20 например и что мы каждый раз будем писать все что ниже ?
    // так же в целом весь код ниже не очень оптимален можно переписать
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changedTodos = todos.map((t, index) => {
            const res = { ...t }
            if (index == idx) {

                // убрать console.log
                console.log('props.user', props.user);
                res.user = e.target.value;
            }
            return res;
        })
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        <select name="user" className={styles.user} onChange={handleChange}>
            {/*нужно прокинуть key в option*/}
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
