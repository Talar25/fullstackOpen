export const Message = ({ message }: { message: string | null }) => {
  if (message === null) return;
  return <p style={{ color: 'red' }}>{message}</p>;
};
