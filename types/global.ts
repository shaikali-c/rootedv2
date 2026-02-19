export type Content = {
  title: string;
  note: string;
  uid: string;
  date: string;
};

export type NoteProp = {
  note: Content;
  active?: boolean;
};

export type Props = {
  children: React.ReactNode;
};

export type CachedUser = {
  username: string;
  key: CryptoKey;
};
