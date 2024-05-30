const munkresAlgorithm = require('./munkresAL.js');

async function optimizeSeating(customers, tables) {
  customers.sort((a, b) => a.checkin - b.checkin);
  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }
  let jobTimes = customers.map((customer) => {
    const start = new Date(customer.checkin);
    const end = new Date(customer.checkout);
    return [
      start.getHours() * 3600 + start.getMinutes() * 60,
      end.getHours() * 3600 + end.getMinutes() * 60
    ];
  });
  let copies = customers.length;

  const n = tables.length;
  const m = customers.length;
  const costMatrix = Array.from({ length: n }, () => Array(m).fill(Infinity));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (
        tables[i].capacity >= customers[j].quantity &&
        tables[i].type === customers[j].catetable
      ) {
        costMatrix[i][j] = tables[i].capacity - customers[j].quantity;
      }
    }
  }
  console.table(costMatrix);
  let Arrange;
  for (i = 0; i < tables.length; i++) {
    tables[i].index = i;
  }
  Arrange = munkresAlgorithm(costMatrix, copies);

  console.log(Arrange);

  // Bước 1: Tạo đối tượng để đếm số lần xuất hiện của phần tử đầu tiên
  const countDict = {};
  Arrange.forEach((sublist) => {
    const firstElement = sublist[0];
    if (countDict[firstElement]) {
      countDict[firstElement]++;
    } else {
      countDict[firstElement] = 1;
    }
  });

  // Bước 2: Tạo mảng mới chỉ chứa các mảng con không bị trùng lặp phần tử đầu tiên
  const result = new Set();
  const removed = new Set();
  const seenFirstElements = {};
  const res = new Set();

  if (Arrange.length === 1) {
    result.add(Arrange[0]);
  } else {
    result.add(Arrange[0]);
    for (i = 0; i < Arrange.length; i++) {
      const firstElement = Arrange[i][0];

      for (j = i + 1; j < Arrange.length; j++) {
        if (Arrange[j][0] === firstElement) {
          result.add(Arrange[i]);
          res.add(Arrange[i]);
          res.add(Arrange[j]);
        } else {
          result.add(Arrange[j]);
        }
      }
    }
  }
  // for (i = 0; i < Arrange.length; i++) {
  //   const firstElement = Arrange[i][0];
  //   for (j = i + 1; j < Arrange.length; j++) {
  //     if (Arrange[j][0] === firstElement) {
  //       res.add(Arrange[i]);
  //       res.add(Arrange[j]);
  //     } else {
  //       result.add(Arrange[j]);
  //     }
  //   }
  // }
  // Convert the set to an array
  let resArray = Array.from(res);
  let seen = new Set();
  let addedFirstTime = new Set(); // Tạo một Set để lưu trữ các giá trị đã xuất hiện lần đầu tiên
  for (let i = 0; i < resArray.length; i++) {
    if (!addedFirstTime.has(resArray[i][0])) {
      result.add(resArray[i]); // Thêm phần tử resArray[i] vào result
      addedFirstTime.add(resArray[i][0]); // Đánh dấu giá trị tại resArray[i][0] đã xuất hiện lần đầu
    }
    let checkoutPlus15Minutes = addMinutes(
      customers[resArray[i][1]].checkout,
      15
    );
    for (let j = i + 1; j < resArray.length; j++) {
      if (resArray[i][0] === resArray[j][0]) {
        if (checkoutPlus15Minutes >= customers[resArray[j][1]].checkin) {
          result.add(resArray[i]);
          removed.add(resArray[j]);
        } else {
          result.add(resArray[j]);
        }
      }
    }
  }

  // removed.forEach((item) => {
  //   if (result.has(item)) {
  //     result.delete(item);
  //   }
  // });
  console.log(res);
  console.log(result);
  console.log(removed);
  // Arrange.forEach((sublist) => {
  //   const firstElement = sublist[0];
  //   if (countDict[firstElement] === 1 || !seenFirstElements[firstElement]) {
  //     result.push(sublist);
  //     seenFirstElements[firstElement] = true;
  //   } else {
  //     const prevIndex = result.findIndex((item) => item[0] === firstElement);
  //     const prevSublist = result[prevIndex];
  //     if (customers[prevSublist[1]].checkout <= customers[sublist[1]].checkin) {
  //       removed.push(sublist);
  //     } else {
  //       removed.push(prevSublist);
  //       result[prevIndex] = sublist;
  //     }
  //   }
  // });
  let removedArr = Array.from(removed);
  for (i = 0; i < removedArr.length; i++) {
    tables[removedArr[i][0]].status = 'Đã gán';
  }
  let resultArr = Array.from(result);
  resultArr.forEach((sublist) => {
    const tableIndex = sublist[0];
    const customerIndex = sublist[1];
    const indexTB = tables.find((t) => t.index === tableIndex);

    customers[customerIndex].o_table = indexTB.name;
  });

  let cus = [];
  let a_table = [];

  for (i = 0; i < removedArr.length; i++) {
    cus.push(customers[removedArr[i][1]]);
  }

  for (i = 0; i < tables.length; i++) {
    if (tables[i].status === 'available') {
      a_table.push(tables[i]);
    }
  }
  if (removedArr.length > 0) {
    await optimizeSeating(cus, a_table);
  }

  return customers;
}
exports.optimizeSeating = optimizeSeating;
