import { GraphQLServer } from "graphql-yoga";

const comments = [
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

const users = [
  {
    id: 1,
    name: "Mohan",
    email: "a",
    age: 18
  },
  {
    id: 2,
    name: "Sudesh",
    email: "a",
    age: 18
  },
  {
    id: 3,
    name: "Bobby",
    email: "a",
    age: 18
  }
];
const posts = [
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

const typeDefs = `
type Query{
    users(search : String) : [User!]!
    posts : [Post!]!
    comments : [Comment!]!
    me : User!
    post: Post!
}
type Comment{
    id :ID!,
    com : String!,
    post : Post!,
    author : User!
}
type User{
    id : ID!
    name : String!
    email : String!
    age : Int
    posts : [Post]!
    comments : [Comment]!

}
type Post{
    id : ID!
    title : String!
    body : String!
    published : Boolean!
    author : User!
    comments : [Comment]!
}
`;
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.search) return users;
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.search.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      return posts;
    },
    comments(parent, args, ctx, info) {
      return comments;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return parent.author === user.id;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return parent.post === post.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("Server started successfully");
});
