let students = [
  { name: "John", age: 20 },
  { name: "Jane", age: 21 },
  { name: "Bob", age: 19 },
  { name: "Hui", age: 42 },
  { name: "Zalupa", age: 21 },
  { name: "Pidorazz", age: 22 }
];

let objToFind = { name: "John", age: 20 };

let newM = students.findIndex((obj) => {
  return obj.name === objToFind.name && obj.age === objToFind.age;
});
console.log(newM);
console.log(students.splice(newM, 1));
console.log(students);

// const indexCard = cartItems.findIndex((thisMassive) => {
//   return (thisMassive.title === obj.title && thisMassive.price === obj.price && thisMassive.imageUrl === obj.imageUrl);
// });
// console.log(`indexTest = ${indexCard}`);
// if (indexCard !== -1) {
//   console.log(`Объект содержится в массиве, выполняю удаление`);
//   cartItems.splice(indexCard, 1);
// } else {
//   console.log(`Объекта нет в массиве, добавляю`);
//   axios.post("https://640c627aa3e07380e8f336cf.mockapi.io/cart", obj);
//   setCartItems(prevState => [...prevState, obj]);
// }