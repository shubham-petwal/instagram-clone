
interface UserDetailsInterface {
    fullName: string;
    userName: string;
    email: string;
    password: string;
  }
interface footerInterface {
    data:string,
    link:string
}

// types for redux state, post and userdata
interface ReduxState {
  isLoading: boolean;
  feedPosts: Post[];
  userData: UserData;
}
interface UserData {
  uid: string;
  userName: string;
  postCount: number;
  fullName: string;
  biodata: string;
  profileImage : string;
}
interface Post {
  userId: string;
  postId: string;
  caption: string;
  image: string;
  createdAt: Date;
}