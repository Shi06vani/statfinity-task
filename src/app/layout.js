import '../app/globals.css';

export const metadata = {
  title: 'Pokemon Explorer',
  description: 'Explore Pokemons using PokeAPI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
