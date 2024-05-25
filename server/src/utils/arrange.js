const munkresAlgorithm = require('./munkresAL.js');
const Table = require('../app/models/Table');
const Customer = require('../app/models/Customer.js');

// async function Arrange() {
//   try {
//     const customers = await Customer.find().exec();
//     const tables = await Table.find().exec();

//     optimizeSeating(customers, tables);
//   } catch (error) {
//     console.error('Lỗi khi lấy dữ liệu:', error);
//   }
// }

async function optimizeSeating(customers, tables) {
  customers.sort((a, b) => a.checkin - b.checkin);

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
  const result = [];
  const removed = [];
  const seenFirstElements = {};

  Arrange.forEach((sublist) => {
    const firstElement = sublist[0];
    if (countDict[firstElement] === 1 || !seenFirstElements[firstElement]) {
      result.push(sublist);
      seenFirstElements[firstElement] = true;
    } else {
      const prevIndex = result.findIndex((item) => item[0] === firstElement);
      const prevSublist = result[prevIndex];

      if (customers[prevSublist[1]].checkout >= customers[sublist[1]].checkin) {
        removed.push(sublist);
      } else {
        removed.push(prevSublist);
        result[prevIndex] = sublist;
      }
    }
  });

  for (i = 0; i < removed.length; i++) {
    tables[removed[i][0]].status = 'Đã gán';
  }
  // In kết quả
  console.log(tables);
  console.log('Mảng không bị trùng lặp:', result);
  console.log('Mảng bị cắt:', removed);
  let cus = [];
  let a_table = [];
  for (i = 0; i < removed.length; i++) {
    cus.push(customers[removed[i][1]]);
  }
  console.log(cus);
  for (i = 0; i < tables.length; i++) {
    if (tables[i].status === 'available') {
      a_table.push(tables[i]);
    }
  }
  if (removed.length > 0) {
    optimizeSeating(cus, a_table);
  }
}

module.exports = optimizeSeating;
