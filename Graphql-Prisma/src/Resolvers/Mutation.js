import uuidv4 from "uuid/v4";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => {
      return user.email === args.data.email;
    });
    if (emailTaken) {
      throw new Error("Email Taken");
    }
    const user = {
      id: uuidv4(),
      ...args.data,
    };
    db.users.push(user);
    return user;
  },

  deleteUser(parent, args, { db }, info) {
    //here i am using findIndex instead of some because by finding index it also helps in deleting it
    const userIndex = db.users.findIndex((user) => {
      return user.id === args.id;
    });
    if (userIndex === -1) {
      throw new Error("User does not exist");
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = args.id === post.author;
      if (match) {
        db.comments = db.comments.filter((comment) => {
          return !comment.post === post.id;
        });
      }
      return !match;
    });
    db.comments = db.comments.filter((comment) => {
      return !comment.user === args.id;
    });
    return deletedUsers[0];
  },

  updateUser(parent, args, { db }, info) {
    const updateuser = db.users.find((user) => {
      return user.id === args.id;
    });
    if (!updateuser) {
      throw new Error("User does not exist");
    }
    if (typeof args.data.email === "string") {
      const emailTaken = db.users.some((user) => {
        return user.email === args.data.email;
      });
      if (emailTaken) {
        throw new Error("Email already exists");
      }
      updateuser.email = args.data.email;
    }
    if (typeof args.data.name === "string") {
      updateuser.name = args.data.name;
    }
    if (typeof args.data.age != "undefined") {
      updateuser.age = args.data.age;
    }
    return updateuser;
  },

  createPost(parent, args, { db }, info) {
    const UserExists = db.users.some((user) => {
      return user.id === args.data.author;
    });
    if (!UserExists) {
      throw new Error("User does not Exist");
    }
    const post = {
      id: uuidv4(),
      ...args.data,
    };
    db.posts.push(post);
    return post;
  },

  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => {
      return post.id === args.id;
    });
    if (postIndex === -1) {
      throw new Error("Post does not exists");
    }
    const deletedPosts = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter((comment) => {
      return comment.post !== args.id;
    });
    return deletedPosts[0];
  },

  createComment(parent, args, { db }, info) {
    const UserExists = db.users.some((user) => {
      return user.id === args.data.author;
    });
    const PostExists = posts.some((post) => {
      return post.id === args.data.post && args.data.published;
    });
    if (!PostExists || !UserExists) {
      throw new Error("Post or User does not Exist");
    }
    const comment = {
      id: uuidv4(),
      ...args.data,
    };
    db.comments.push(comment);
    return comment;
  },

  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );
    if (commentIndex === -1) {
      throw new Error("Comment does not exists!");
    }
    const deletedComment = db.comments.splice(commentIndex, 1);
    return deletedComment[0];
  },
};
export default Mutation;
