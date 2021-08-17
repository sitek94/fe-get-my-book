export interface Book {
  title: string;
  author: string;
  pagesCount: number;
  tags: string[];
}

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface DivBaseProps extends React.HTMLAttributes<HTMLDivElement> {}

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;
