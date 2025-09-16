export interface Folder {
  _id: string;
  name: string;
  createdAt: string;
}

export interface GetFolderResponse {
  folders: Folder[];
  totalPages: number;
}

export interface GetPhotoResponse {
  _id: string;
  link: string;
  size: number;
  uploadedAt: string;
}
