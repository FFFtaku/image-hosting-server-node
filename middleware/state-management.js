
let store={};

function setState(stateName,state){
  store[stateName] = state;
}

function removeState(stateName){
  delete store[stateName];
}

function getState(stateName){
  return store[stateName];
}

function initState(initStateObject){
  store = initStateObject;
}

/**
 * @description 自定义全局状态管理中间件
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function stateManagement(req,res,next){
  req.setState = setState;
  req.removeState = removeState;
  req.getState = getState;
  next();
}

// 只能执行一次initState，否则会覆盖所有状态。如果不执行，则store为空对象。
stateManagement.initState = initState;
stateManagement.action = {
  setState,
  removeState,
  getState
};
module.exports = stateManagement;