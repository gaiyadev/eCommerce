module.exports = {
  createUser: (args) => {
    const { email, password } = args.userData;
    console.log(email, password);
    return { email, password };
  },
};
