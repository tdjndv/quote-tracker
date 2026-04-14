export type Tag = {
  id: number;
  name: string;
};

export type QuoteUser = {
  id: number;
  email: string;
};

export type Quote = {
  id: number;
  user_id: number;
  content: string;
  author: string | null;
  book_title: string | null;
  notes: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  tags: Tag[];
  user?: QuoteUser;
};