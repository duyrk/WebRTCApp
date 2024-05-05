import { Box } from '@mantine/core';
import { HeaderMenu } from '@app/pokemon/components/HeaderMenu';

export default function PokemonLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <HeaderMenu />
      <nav></nav>
      {children}
    </section>
  );
}
