export interface RegisterStep1Payload {
    email: string;
}

export interface RegisterStep1Response {
    tempUserId: number;
}

export interface RegisterStep2Payload {
    tempUserId: number;
    verificationCode: string;
}

export interface RegisterStep2Response {
    userId: number;
}

export interface RegisterStep3Payload {
    userId: number;
    password: string;
    phoneNumber: string;
}

export interface RegisterStep3Response {
    accessToken?: string;
    refreshToken?: string;
}
export interface RegisterPageProps {
  searchParams: {
    email?: string;
    token?: string;
  };
}