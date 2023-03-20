import moment from "moment";

export const formatDate = (date: string | Date, format: string) => {
  return moment(date).format(format);
};
