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
  user_name: string;
  role: "buyer" | "seller";
  image_url: string;
}
