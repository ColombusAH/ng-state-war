import { BehaviorSubject, Observable, Subject } from "rxjs";
import { scan, share } from "rxjs/operators";

type Reducer<S, T> = (state: S, event: T) => S;

type FromReducerReturnType<T, S> = [Observable<S>, (event: T) => void];

type FromReducer = <S, T>(
  reducer: Reducer<S, T>,
  initialState: S
) => FromReducerReturnType<T, S>;

export function fromReducer<S, T>(
    reducer: Reducer<S, T>,
    initialState: S
  ): FromReducerReturnType<T, S> {
    const events$ = new Subject<T>();
  
    const state$ = events$.pipe(
      scan(reducer, initialState),
      share()
    );
  
    const dispatch = (event: T) => events$.next(event);
  
    return [state$, dispatch];
  }