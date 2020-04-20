let comments = [
  {
    id: 21,
    com: "Good",
    post: 4,
    author: 1
  },
  {
    id: 22,
    com: "Beautiful",
    post: 5,
    author: 2
  }
];

let users = [
  {
    id: 100,
    name: "Mohan",
    email: "a",
    age: 18
  },
  {
    id: 200,
    name: "Sudesh",
    email: "a",
    age: 18
  },
  {
    id: 300,
    name: "Bobby",
    email: "a",
    age: 18
  }
];
let posts = [
  {
    id: 4,
    title: "Maths",
    body: "Probability Course",
    published: 2010,
    author: 2
  },
  {
    id: 5,
    title: "Physics",
    body: "Fluid Mechanics",
    published: 2018,
    author: 3
  }
];

let db = {
  users,
  posts,
  comments
};
export { db as default };
