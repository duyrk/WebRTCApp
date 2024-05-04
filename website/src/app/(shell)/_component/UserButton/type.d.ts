interface IUserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  username: string;
  avatar: string;
  email: string;
  icon?: React.ReactNode;
}
