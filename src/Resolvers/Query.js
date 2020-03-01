const Query = {
  users(parent, args, { db }, info) {
    if (!args.search) return db.users;
    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.search.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    return db.posts;
  },
  comments(parent, args, { db }, info) {
    returndb.comments;
  }
};
export default Query;
