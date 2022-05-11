import { createAction, handleActions } from "redux-actions";
import {
  delay,
  put,
  takeEvery,
  takeLatest,
  select,
  throttle,
} from "redux-saga/effects";

//액션 타입: '모듈이름/액션이름' 으로 명명
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); //1초 기다림
  yield put(increase()); //디스패치 해줌
  // const number = yield select((state) => state.counter);
  // console.log(number);
}
function* decreaseSaga() {
  yield delay(1000); //1초 기다림
  yield put(decrease()); //디스패치 해줌
}

export function* counterSaga() {
  //사가가 실행되는 주기 제한: n초에 한번
  yield throttle(3000, INCREASE_ASYNC, increaseSaga);
  //들어오는 모든 액션에 대해 특정 작업을 처리해 준다.
  // yield takeEvery(INCREASE_ASYNC, increaseSaga);

  // 기존에 진행중인 작업이 있으면 모두 취소하고 가장 마지막에 들어오는 작업만 수행
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// export const increaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };

// export const decreaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// };

//초기상태, 리듀서(데이터 변형)
const initialState = 0;

// handleActions(각 액션에 대한 업데이트 함수, 초기 state)
const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
