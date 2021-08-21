import IComments from "./IComment";

interface IPost {
  title: string;
  body: string;
  id?: string;
  comments?: IComments[];
  createdAt?: number;
  updatedAt?: number;
}

export default IPost;
