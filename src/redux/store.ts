import {combineReducers, createStore} from "redux";
import {reducer} from "./reducers";


const rootReducers = combineReducers({
        reducer: reducer
})

type AppStateType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers)