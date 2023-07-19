"use strict";

const bcrypt = require("bcryptjs"); //hashing passwords

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "Nicolas Talledo",
          email: "nicolastalledo13@gmail.com",
          password: await bcrypt.hash("password123", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Hag",
          email: "theHag@gmail.com",
          password: await bcrypt.hash("password321", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const users = await queryInterface.sequelize.query(`SELECT id FROM users`);
    const uId = users[0][0].id;

    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "TTP",
          content:
            "I've been learning so much in TTP! Some things I've learned include...",
          userid: uId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "MMA Lessons",
          content: "This post you can sumbit someone...",
          userid: uId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const posts = await queryInterface.sequelize.query(`SELECT id FROM posts`);
    const pId = posts[0][0].id;

    await queryInterface.bulkInsert(
      "comments",
      [
        {
          content: "I feel the same way about TTP!",
          userid: uId,
          postid: pId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "A new thing to add to my arsenal",
          userid: uId,
          postid: pId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("posts", null, {});
    await queryInterface.bulkDelete("comments", null, {});
  },
};
