// 루트 리듀서: 기존에 만들었던 리듀서들을 하나로 합쳐준다
import { combineReducers } from "redux";
// import counter from "./counter";
import sample from "./sample";
import loading from "./loading";

const rootReducer = combineReducers({
  // counter,
  sample,
  loading,
});

export default rootReducer;
