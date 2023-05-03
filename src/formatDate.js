export const formatDate = (date, format) => {
  const dateObj = new Date(date);

  if (isNaN(dateObj)) {
    return "Invalid date";
  }

  switch (format) {
    case "day":
      return dateObj.toLocaleDateString(undefined, {
        day: "numeric",
      });
    case "year":
      return dateObj.toLocaleDateString(undefined, {
        year: "numeric",
      });
    case "monthAndYear":
      return dateObj.toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      });
    case "default":
      const month = `${dateObj.getMonth() + 1}`.padStart(2, "0");
      const day = `${dateObj.getDate()}`.padStart(2, "0");
      const year = dateObj.getFullYear();
      return [year, month, day].join("-");
    default:
      throw new Error(`Invalid date format: ${format}`);
  }
};
