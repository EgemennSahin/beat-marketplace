export interface BeatData {
  id: number;
  name: string;
  audioSrc: string;
  price: number;
  imageSrc: string;
  userId: string;
  userName: string;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
}
