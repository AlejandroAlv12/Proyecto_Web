module.exports = {
  createUser: `INSERT INTO Users (username, email, passwordHash) VALUES (@username, @email, @passwordHash); SELECT SCOPE_IDENTITY() AS id;`,
  getUserByEmail: `SELECT * FROM Users WHERE email = @email;`,
  getUserById: `SELECT * FROM Users WHERE id = @id;`,

  createLot: `INSERT INTO Lots (name, location, price, size, description) VALUES (@name, @location, @price, @size, @description); SELECT SCOPE_IDENTITY() AS id;`,
  getAllLots: `SELECT * FROM Lots;`,
  getLotById: `SELECT * FROM Lots WHERE id = @id;`
};
