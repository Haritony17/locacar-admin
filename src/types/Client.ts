export interface UserAccountSummary {
  id: string;
  email: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  address: string | null;
  drivingLicenseNumber: string | null;
  userAccount: UserAccountSummary | null;
}

export interface CreateClientPayload {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;
  drivingLicenseNumber?: string;
  password?: string;
}

export interface CreateAccountResponse {
  message: string;
  userId: string;
  email: string;
  mustChangePassword: boolean;
}