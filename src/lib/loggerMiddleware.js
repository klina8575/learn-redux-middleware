//커링함수
/* next: store.dispatch 와 비슷한 역할
- store.dispatch와 차이점: 미들웨어가 여러개 일때 다음 미들웨어에게 액션을 넘겨줌.

*/

const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action && action.type);
  console.log("이전상태", store.getState());
  console.log("액션", action);

  next(action); //다음 미들웨어 혹은 리듀서에게 전달

  console.log("다음상태", store.getState()); //업데이트 된 상태
  console.groupEnd();
};

// const loggerMiddleware = function loggerMiddleware(store) {
//   return function (next) {
//     return function (action) {};
//   };
// };

export default loggerMiddleware;
