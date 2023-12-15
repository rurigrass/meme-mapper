export type memeType = {
  createdAt: Date;
  creatorId: string | null;
  fileUrl: string;
  screenshotUrl?: string | undefined;
  id: string;
  lat: number;
  lng: number;
  name: string;
  updatedAt: Date;
  url: string;
  verified: boolean;
};
