var state = { stateArr: [] };
function addTo(add) {
  if (!state.stateArr.includes(add)) {
    state.stateArr.push(add);
    console.log(state.stateArr);
  }
}
export { state, addTo };
