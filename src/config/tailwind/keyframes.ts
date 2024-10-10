export const keyframes = {
  bounce: {
    "0%": {
      transform: "scale(0.875, 0.875) translateY(0)",
    },
    "50%": {
      transform: "scale(1, 1) translateY(-10px)",
    },
    "100%": {
      transform: "scale(0.875, 0.875) translateY(0)",
    },
  },
  "btn-bg-scale-full": {
    "0%": { left: "50%", opacity: "0", right: "50%" },
    "100%": { left: "0", opacity: "1", right: "0" },
  },
  "btn-bg-scale-unset": {
    "0%": { left: "0", opacity: "1", right: "0" },
    "100%": { left: "50%", opacity: "0", right: "50%" },
  },
}
