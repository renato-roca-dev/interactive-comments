export const getComments = async () => {
  return [
    {
      id: "2",
      body: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      username: "amyrobson",
      image: "images/avatars/image-amyrobson.webp",
      score: 12,
      userId: "2",
      parentId: null,
      parentReply: null,
      createdAt: "2022-09-20T23:12:12.010+02:00",
    },
    {
      id: "3",
      body: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      username: "maxblagun",
      image: "images/avatars/image-maxblagun.webp",
      score: 5,
      userId: "3",
      parentId: null,
      parentReply: null,
      createdAt: "2022-09-20T23:12:12.010+02:00",
    },
    {
      id: "4",
      body: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      username: "ramsesmiron",
      image: "images/avatars/image-ramsesmiron.webp",
      score: 2,
      userId: "4",
      parentId: "2",
      parentReply: "amyrobson",
      createdAt: "2022-09-20T23:12:12.010+02:00",
    },
    {
      id: "5",
      body: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      username: "ramsesmiron",
      image: "images/avatars/image-ramsesmiron.webp",
      score: 1,
      userId: "5",
      parentId: "3",
      parentReply: "maxblagun",
      createdAt: "2022-09-20T23:12:12.010+02:00",
    },
  ];
};

export const createComment = async (text, parentId = null, parentReply = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    score: 0,
    username: "juliusomo",
    parentReply,
    image: "images/avatars/image-juliusomo.webp",
    createdAt: new Date().toISOString(),
  };
};

export const updateScore = async (score) => {
  return { score };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};