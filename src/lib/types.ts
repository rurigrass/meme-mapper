export enum MemeStatusTypes {
  PENDING = "PENDING",
  DETECTIVE = "DETECTIVE",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type memeType = {
  createdAt: Date;
  creatorId: string | null;
  fileUrl: string;
  screenshotUrl?: string | undefined;
  id: string;
  lat: number;
  lng: number;
  name: string;
  description?: string;
  updatedAt: Date;
  url: string;
  verified: boolean;
  status: MemeStatusTypes | string;
};

// type MemeProps = {
//   createdAt: Date;
//   creatorId: string | null;
//   fileUrl: string;
//   screenshotUrl: string;
//   id: string;
//   lat: number;
//   lng: number;
//   name: string;
//   description: string;
//   updatedAt: Date;
//   url: string;
//   verified: boolean;
// };
