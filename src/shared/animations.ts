export const routingRight = {
  hidden: {
    translateX: typeof window !== "undefined" ? window.innerWidth : 0,
    opacity: 0,
  },
  visible: {
    translateX: 0,
    opacity: 1,
  },
  exit: {
    translateX: typeof window !== "undefined" ? -window.innerWidth : 0,
    opacity: 0,
  },
};

export const routingLeft = {
  hidden: {
    translateX: typeof window !== "undefined" ? -window.innerWidth : 0,
    opacity: 0,
  },
  visible: {
    translateX: 0,
    opacity: 1,
  },
  exit: {
    translateX: typeof window !== "undefined" ? window.innerWidth : 0,
    opacity: 0,
  },
};
