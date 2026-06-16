import moment from "jalali-moment";

export const FormatDate = (date: string, lng: "fa" | "en") => {
  const jsDate = new Date(date);
  if (lng == "fa" && typeof date == "string") {
    return moment(jsDate).locale("fa").format("dddd jD jMMMM jYYYY HH:mm");
  } else if (lng == "en" && typeof date == "string") {
    return moment(jsDate).locale("en").format("dddd D MMMM YYYY HH:mm");
  } else {
    return;
  }
};
