const express = require("express");
const app = express();
const port = 4002;

const bcrypt = require("bcryptjs"); //using for hashing password
const session = require("express-session");
const { Post, User, Comment } = require("./models");
require("dotenv").config();

// middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
    console.log(`Response Status: "${res.statusCode}`);
  });
  next();
});
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);

const authenticateUser = (req, res, next) => {
  if (!req.session.userid) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page..." });
  }
  next();
};
//welcoming message for root route
app.get("/", (req, res) => {
  res.send("Welcome to my blog...");
});

// post request to signup
app.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    req.session.userid = user.id;

    res.status(201).json({
      message: "User created successfully...",
      user: {
        username: user.username,
        email: user.email,
      },
    });
    console.log(user);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(422)
        .json({ errors: error.errors.map((e) => e.message) });
    }
    res.status(500).json({
      message: "Error occurred when making user...",
      error: error,
    });
  }
});

//post request to  login
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user === null) {
      return res.status(401).json({
        message: "Incorrect credentials...",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordMatch) {
      req.session.userid = user.id;

      res.status(200).json({
        message: "Logged in successfully...",
        user: {
          name: user.username,
          email: user.email,
        },
      });
    } else {
      return res.status(401).json({
        message: "Incorrect credentials...",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred during the login process...",
    });
  }
});

//delete session cookie (logging out)
app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.clearCookie("connect.sid");
    return res.sendStatus(200);
  });
});

//get all post
app.get("/posts", authenticateUser, async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    console.log(allPosts);
    res.status(200).json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to retrieve posts..." });
  }
});

//get specific post
app.get("/posts/:id", authenticateUser, async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const post = await Post.findOne({
      where: { id: postId },
    });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send({ message: "Post not found..." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to retrieve posts..." });
  }
});

//get all users
app.get("/users", authenticateUser, async (req, res) => {
  try {
    const allUsers = await User.findAll();

    res.status(200).json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error getting all users..." });
  }
});

//create a new post
app.post("/posts", authenticateUser, async (req, res) => {
  const userid = req.session.userid;

  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userid: userid,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(newPost);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

//update specific post
app.patch("/posts/:id", authenticateUser, async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const record = await Post.findOne({ where: { id: postId } });
    if (record && record.UserId !== parseInt(req.session.userid, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action..." });
    }

    const [numberOfAffectedRows, affectedRows] = await Post.update(req.body, {
      where: { id: postId },
      returning: true,
    });

    if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).json({ message: "Post not found..." });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

//update specific comment
app.patch(
  "/posts/:postId/comments/:commentid",
  authenticateUser,
  async (req, res) => {
    const commentId = parseInt(req.params.commentid, 10);

    try {
      const record = await Comment.findOne({ where: { id: commentId } });
      if (record && record.userid !== parseInt(req.session.userid, 10)) {
        return res
          .status(403)
          .json({ message: "Not authorized to perform this action..." });
      }

      const [numberOfAffectedRows, affectedRows] = await Comment.update(
        req.body,
        {
          where: { id: commentId },
          returning: true,
        }
      );

      if (numberOfAffectedRows > 0) {
        res.status(200).json(affectedRows[0]);
      } else {
        res.status(404).json({ message: "Comment not found..." });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res
          .status(422)
          .json({ errors: err.errors.map((e) => e.message) });
      }
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
);

//delete specific post
app.delete("/posts/:id", authenticateUser, async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const record = await Post.findOne({ where: { id: postId } });
    if (record && record.userid !== parseInt(req.session.userid, 10)) {
      return res
        .status(403)
        .json({ message: "Your not able to delete someone else's post..." });
    }

    const deleteOperation = await Post.destroy({ where: { id: postId } });

    if (deleteOperation > 0) {
      res.status(200).send({ message: "Post deleted successfully..." });
    } else {
      res.status(404).send({ message: "Post not found..." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
// BONUS --------------------------------------------------------

//delete specific comment
app.delete(
  "/posts/:postId/comments/:commentid",
  authenticateUser,
  async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);

    try {
      const record = await Comment.findOne({ where: { id: commentId } });
      if (record && record.UserId !== parseInt(req.session.userId, 10)) {
        return res
          .status(403)
          .json({ message: "Your not able to deletecomment..." });
      }

      const deleteOperation = await Comment.destroy({
        where: { id: commentId },
      });

      if (deleteOperation > 0) {
        res.status(200).send({ message: "Comment deleted successfully..." });
      } else {
        res.status(404).send({ message: "Comment not found..." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
);

//create a new comment to a post
app.post("/posts/:id/comments", authenticateUser, async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const content = req.body.content;
  const userId = req.session.userid;

  try {
    const newComment = await Comment.create({
      content: content,
      userid: userId,
      postid: postId,
    });

    res.status(201).json({
      message: "Comment created successfully...",
      comment: newComment,
    });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

//get all comments from a specific post
app.get("/posts/:id/comments", authenticateUser, async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const comments = await Comment.findAll({
      where: {
        postid: postId,
      },
    });

    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(404).send({ message: "Comments not found..." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error..." });
  }
});

//get all comments of a specific user
app.get("/users/:id/comments", authenticateUser, async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const comments = await Comment.findAll({
      where: { userid: userId },
    });

    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(404).send({ message: "User not found..." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

//get all post of a specific user
app.get("/users/:id/posts", authenticateUser, async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const posts = await Post.findAll({
      where: { userid: userId },
    });

    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).send({ message: "User not found..." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "error..." });
  }
});
