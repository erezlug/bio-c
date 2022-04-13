import moment from "moment";

export const readableDate = (date) => {
    return moment(date).format("LL | HH:mm");
};