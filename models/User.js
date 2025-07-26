const bcrypt = require('bcrypt');
class User {
  constructor() {
     this.users = [];
     this.nextId = 1;
  }

  async createUser(userData) {
    const {username, email, password} = userData;

    const exitingUser = this.users.find(user => user.username === username || user.email === email);

    if(exitingUser) {
      throw new Error('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: this.nextId++,
      username,
      email,
      password: hashedPassword
    };
    this.users.push(newUser);

    const {password: _, ...userWithoutPassword} = newUser; // Exclude password from the returned user object // object destructuring
    return userWithoutPassword;
  } 

    async findUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    async findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    async findUserById(id) {
        return this.users.find(user => user.id === id);
    }


    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = new User();
