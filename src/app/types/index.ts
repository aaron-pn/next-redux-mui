export interface FormValuesUserInformation {
  firstName: string;
  middleName?: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  dateOfBirth: string;
  age: number;
}

export interface OptionsSelectInput {
  id: string;
  name: string;
}

export interface CountryResponse {
  cca3: string;
  name: {
    common: string;
  };
}
