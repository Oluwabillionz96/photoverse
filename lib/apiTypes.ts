export interface Folder {
  _id: string;
  name: string;
  createdAt: string;
  photos: Photo[];
}

export interface Photo {
  _id: string;
  link: string;
  size: number;
  folder: Folder | string;
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
