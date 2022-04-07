import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                case 'ADD_TODO': {
                    // зачем все это что ниже ? можно обойтись одной строкой
                    // return {...state , todos : {...todos, action.payload} или что нибудь в этом духе
                    const newState = state;
                    newState.todos.push(action.payload);
                    return newState;
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        //any убрать
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    // зачем мы каждый раз меняем все целиком если можем менять конкретно 1 элемент
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
