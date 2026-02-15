const date = new Date();
export const date_f = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  day: "numeric",
  month: "short",
}).format(date);
