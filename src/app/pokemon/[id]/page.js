import Image from "next/image";

async function getPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function PokemonDetail({ params }) {
  const pokemon = await getPokemon(params.id);

  return (
    <div className="flex justify-center items-center sm:h-screen">
      <div className="p-8 max-w-6xl    bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            className=" sm:w-40 xl:w-64 h-44 object-contain "
          />
          <div className="flex-1">
            <h1 className="text-3xl xl:text-4xl font-bold capitalize text-gray-800 mb-4 border-b pb-2">
              {pokemon.name}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-semibold">Types</p>
                <div className="flex gap-2 mt-1">
                  {pokemon.types.map((t) => (
                    <span
                      key={t.type.name}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize"
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">Abilities</p>
                <ul className="list-disc list-inside text-gray-700 mt-1">
                  {pokemon.abilities.map((a) => (
                    <li key={a.ability.name} className="capitalize">
                      {a.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-lg font-semibold">Base Stats</p>
              <div className="space-y-2 mt-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex justify-between">
                    <span className="capitalize text-gray-700 w-32">
                      {stat.stat.name}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded overflow-hidden mx-2">
                      <div
                        className="bg-green-500 text-xs text-white px-2 py-1"
                        style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                      >
                        {stat.base_stat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-lg font-semibold">Moves (Top 5)</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {pokemon.moves.slice(0, 5).map((m) => (
                  <span
                    key={m.move.name}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm capitalize"
                  >
                    {m.move.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
