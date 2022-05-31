import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import {tasksReducer} from "./modules/tasks/slice";

const store = configureStore({
    reducer: {
        tasks: tasksReducer
    },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store