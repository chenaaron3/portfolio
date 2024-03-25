export const formatDate = (date: Date | undefined) => {
  if (date == undefined) {
    return "Present";
  } else {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }
};
