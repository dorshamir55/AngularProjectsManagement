import { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, ADD_TASK, UPDATE_TASK, DELETE_TASK, UPDATE_CURRENT_PROJECT_ID, UPDATE_CURRENT_TASK_ID, UPDATE_TASK_LIST, GET_PROJECT_LIST } from '../actions/appActions';
import { Project } from "src/app/model/project";
import { Task } from "src/app/model/task";

interface appReducerState{
    projects: Project[];
    tasks: Task[];
    currentProjectId: number;
    currentTaskId: number;
}

const initialState: appReducerState = {
    projects: [],
    tasks: [],
    currentProjectId: -1,
    currentTaskId: -1
};

export function reducer(state = initialState, action: any) {
    switch(action.type) {

        //Project actions
        case ADD_PROJECT:
            return {
                ...state,
                projects: state.projects.concat(action.payload)
            }

        case GET_PROJECT_LIST:
            return {
                ...state,
                projects: action.payload
            }

        case UPDATE_PROJECT:
            const indexProjectToUpdate = state.projects.findIndex(project => project.id === action.payload.id);
            const newProjects = [...state.projects];
            newProjects[indexProjectToUpdate] = {
                id: action.payload.id,
                name: action.payload.name
            }

            return {
                ...state,
                projects: newProjects
            }

        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                tasks: [],
                currentProjectId: -1
            }

        //Task actions
        case ADD_TASK:
            return {
                ...state,
                tasks: state.tasks.concat(action.payload)
            }

        case UPDATE_TASK_LIST:
            return {
                ...state,
                tasks: action.payload
            }

        case UPDATE_TASK:
            const indexTaskToUpdate = state.tasks.findIndex(task => task.id === action.payload.id);
            const newTasks = [...state.tasks];
            newTasks[indexTaskToUpdate] = {
                id: action.payload.id,
                content: action.payload.content,
                projectId: action.payload.projectId,
                checked: action.payload.checked
            }

            return {
                ...state,
                tasks: newTasks
            }

        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }

        //Global actions
        case UPDATE_CURRENT_PROJECT_ID:
            return {
                ...state,
                currentProjectId: action.payload
            }

        case UPDATE_CURRENT_TASK_ID:
            return {
                ...state,
                currentTaskId: action.payload
            }
    }

    return state;
}