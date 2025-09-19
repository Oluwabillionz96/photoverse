export interface Folder {
  _id: string;
  name: string;
  createdAt: string;
}

export interface Photo {
  _id: string;
  link: string;
  size: number;
  folder: string;
  uploadedAt: string;
  isFavourite: boolean;
}

export interface GetFolderResponse {
  folders: Folder[];
  totalPages: number;
}

export interface GetPhotoResponse {
  photos: Photo[];
  totalPages: number;
}
