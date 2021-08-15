interface LinkProps {
  to: string;
  children: React.ReactNode;
}

function Link({ to, children }: LinkProps) {
  return (
    <a
      className="text-blue-500 hover:underline"
      rel="noreferrer noopener"
      href={to}
    >
      {children}
    </a>
  );
}

export default Link;
