import React from 'react';

const Page: React.FC<{ params: { name: string } }> = ({ params }) => {
  return <div>{params.name}</div>;
};
export default Page;
