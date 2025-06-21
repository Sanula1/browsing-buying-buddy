
export interface Village {
  id: number;
  name: string;
  province: string;
  district: string;
  country: string;
  postalCode: string;
}

export interface Temple {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  website: string;
}

export interface Family {
  id: number;
  familyName: string;
  address: string;
  telephone: string;
}

export interface Dana {
  id: number;
  name: string;
  description: string;
  time: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
}

export interface Member {
  id: number;
  name: string;
  nic: string;
  dob: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface TempleDanaAssignment {
  id: number;
  templeDana: {
    templeId: Temple;
    dana: Dana;
    minNumberOfFamilies: number;
  };
  family: Family;
  date: string;
  isConfirmed: boolean;
  confirmationDate?: string;
}

export interface HeadMonk {
  id: number;
  monkName: string;
  email: string;
  phoneNumber: string;
  address: string;
  templeId: number;
}

export interface Helper {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  templeId: number;
}

export interface LoginRequest {
  phoneNumber: string;
  password: string;
}
