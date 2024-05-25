const munkres = require('munkres-js');

function munkresAlgorithm(costMatrix, copies) {
  let expandedCostMatrix = [];
  let validAssignments = [];
  for (let i = 0; i < costMatrix.length; i++) {
    for (let j = 0; j < copies; j++) {
      let newRow = [...costMatrix[i]];
      expandedCostMatrix.push(newRow);
    }
  }
  let indices = munkres(expandedCostMatrix);

  indices.forEach(([agent, job]) => {
    let table = Math.floor(agent / copies);
    if (expandedCostMatrix[agent][job] !== Infinity) {
      validAssignments.push([table, job]);
      // customers[job].o_table = table;
      console.log(
        `Bàn ${
          //Math.floor(
          agent / copies
          // )
        } 
        được gán cho Khách ${job} với chi phí ${expandedCostMatrix[agent][job]}`
      );
    } else {
      console.log(
        `Agent ${
          agent / copies
        } không thể được gán cho Job ${job} do trùng lặp thời gian`
      );
    }
  });
  return validAssignments;
}
module.exports = munkresAlgorithm;
