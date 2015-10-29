function forwardMultiplyGate(x, y) {
        return x * y;
}
function forwardAddGate(a, b) {
  return a + b;
};
function forwardCircuit(x,y,z) {
  var q = forwardAddGate(x, y);
  var f = forwardMultiplyGate(q, z);
  return f;
};
 
module.exports.forwardMultiplyGate = forwardMultiplyGate;
module.exports.forwardAddGate = forwardAddGate;
module.exports.forwardCircuit = forwardCircuit;
