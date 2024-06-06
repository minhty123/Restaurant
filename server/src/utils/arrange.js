const munkresAlgorithm = require('./munkresAL.js');
const Catetable = require('../app/models/CateTable.js');
const Customer = require('../app/models/Customer.js');
const { set } = require('mongoose');
async function getReversedTime(catetableName) {
  let table = await Catetable.findOne({ name: catetableName }).exec();
  return table.reversed_time;
}
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

  const countDict = {};
  Arrange.forEach((sublist) => {
    const firstElement = sublist[0];
    if (countDict[firstElement]) {
      countDict[firstElement]++;
    } else {
      countDict[firstElement] = 1;
    }
  });
  const seenFirstElements = {};
  // Bước 2: Tạo mảng mới chỉ chứa các mảng con không bị trùng lặp phần tử đầu tiên
  const result = new Set();
  const removed = new Set();
  const res = new Set();
  if (Arrange.length === 1) {
    result.add(Arrange[0]);
  } else {
    result.add(Arrange[0]);
    for (i = 0; i < Arrange.length; i++) {
      const firstElement = Arrange[i][0];
      for (j = i + 1; j < Arrange.length; j++) {
        if (Arrange[j][0] === firstElement) {
          res.add(Arrange[i]);
          res.add(Arrange[j]);
        } else {
          result.add(Arrange[j]);
        }
      }
    }
  }
  let seen = new Set();
  // Convert the set to an array
  let resArray = Array.from(res);
  let addedFirstTime = new Set(); // Tạo một Set để lưu trữ các giá trị đã xuất hiện lần đầu tiên
  for (let i = 0; i < resArray.length; i++) {
    if (!addedFirstTime.has(resArray[i][0])) {
      result.add(resArray[i]);
      addedFirstTime.add(resArray[i][0]);
    }

    let j = i + 1;
    while (j < resArray.length) {
      if (resArray[i][0] === resArray[j][0]) {
        let reversedTime = await getReversedTime(tables[resArray[i][0]].type);
        console.log(reversedTime);
        let checkoutPlusReversedTime = addMinutes(
          customers[resArray[i][1]].checkout,
          reversedTime
        );
        if (checkoutPlusReversedTime >= customers[resArray[j][1]].checkin) {
          result.add(resArray[i]);
          removed.add(resArray[j]);
          resArray.splice(j, 1);
        } else {
          result.add(resArray[j]);
          j++; // Tăng chỉ số j nếu không xóa phần tử
        }
      } else {
        j++; // Tăng chỉ số j nếu không có kết nối
      }
    }
  }

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

module.exports = optimizeSeating;
