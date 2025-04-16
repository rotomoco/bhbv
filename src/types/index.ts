export interface Post {
  id: string;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
  user_id: string;
}