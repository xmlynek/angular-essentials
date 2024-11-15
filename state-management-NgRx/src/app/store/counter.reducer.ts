import {createReducer, on} from "@ngrx/store";
import {
  decrement,
  increment, set,
} from "./counter.actions";

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, {value}) => state + value),
  on(decrement, (state, {value}) => state - value),
  on(set, (_state, {value}) => value)
)

// alternative old way approach

// export function counterReducer(state = initialState, action: CounterActions | Action) {
//   if (action instanceof IncrementAction) {
//     return state + action.value;
//   } else if (action instanceof DecrementAction) {
//     return state - action.value;
//   }
//   return state;
// }
