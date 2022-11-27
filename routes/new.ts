import express, { Request, Response } from "express";
const router = express.Router();

export const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

router.use(express.urlencoded());

router.get("/", (req: Request, res: Response) => {
  res.render("pages/new");
});

router.post("/", (req: Request, res: Response) => {
  console.log("[server]: Received new message:", req.body);

  messages.push({
    text: req.body.messageUser,
    user: req.body.messageText,
    added: new Date()
  });

  res.redirect("/");
});

export default router;
