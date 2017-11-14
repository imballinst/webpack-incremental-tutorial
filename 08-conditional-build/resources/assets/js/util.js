function printA() {
  // [NEW] process.conditionalVar should be undefined in runtime
  // But since we use DefinePlugin, process.conditionalVar will be haHAA at runtime
  console.log(process.conditionalVar);
}

function printB() {
  console.log('this is printB');
}

export { printA, printB };
