import { strictEqual } from "assert";

var state = { stateArr: [] };
function addTo(add) {
  if (!state.stateArr.includes(add)) {
    state.stateArr.push(add);
    console.log(state.stateArr);
  } else {
    const index = state.stateArr.indexOf(add);
    if (index > -1) {
      state.stateArr.splice(index, 1);
    }
  }
}
function reset() {
  state = { stateArr: [] };
}
export { state, addTo, reset };
