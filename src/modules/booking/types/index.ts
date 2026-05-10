export interface IPassenger {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  birthDate: Date | string;
  nationalId: string;
}

export interface IFormProps {
  traveler_details: IPassenger[];
  sharedEmail?: string;
  sharedMobile?: string;
}

type TReservedDates = Date;

export interface IBookingRequest {
  houseId: string;
  reservedDates: TReservedDates[];
  traveler_details: IPassenger[];
  sharedEmail: string;
  sharedMobile: string;
}
