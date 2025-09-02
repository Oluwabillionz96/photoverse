export interface GetFolderResponse {
  folder: {
    _id: string;
    name: string;
    createdAt: string;
  }[];
}

export interface GetPhotoResponse {
    _id: string;
    link: string;
    size: number;
    uploadedAt: string;
}
