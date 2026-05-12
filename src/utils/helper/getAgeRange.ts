import moment from "jalali-moment";

export const getAgeRange = (birthDate: string) => {
  const age = moment().diff(moment(birthDate), "years");
  if (age < 10) return "کودک";
  if (age < 20) return "نوجوان";
  if (age < 60) return "بزرگسال";
  return "سالمند";
};
