import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import superagent from "superagent";
import {RootState} from "../../root";

export type Task = {
    id: number,
    title: string
    description: string
    date: Date
}

type Tasks = Task[]

type TasksState = {
    isLoading: boolean
    tasks: Tasks
    error: any
}

const initialState = {
    isLoading: false,
    tasks: [],
    error: null
}

export const fetchTasks = createAsyncThunk<Tasks>('fetchTasks', async () => {
    const {body} = await superagent.get('/tasks')
    return body
})

export const removeTask = createAsyncThunk('removeTask', async (id: Task["id"]) => {
    const {body} = await superagent.delete(`/tasks/${id}`)
    return body
})

export const tasksReducer = createReducer<TasksState>(initialState, (builder) => {
    builder
        .addCase(fetchTasks.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload
            state.isLoading = false
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.error = action.error
        })
})

export const tasksSelector = (state: RootState) => state.tasks