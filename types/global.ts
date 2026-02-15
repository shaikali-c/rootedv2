export type Content = {
  title: string;
  note: string;
  uid: string;
};

export type NoteProp = {
  note: Content;
  active?: boolean;
};

export type Props = {
  children: React.ReactNode;
};
