"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className= " text-2xl sm:text-3xl xl:text-4xl font-bold mb-10">Pokemon Explorer</h1>
      <input
        type="text"
        placeholder="Search Pokemon..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 pl-3 mb-6 border rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
      <div>
        {filtered.length == 0 ? 
        (
           <div className="  w-full flex justify-center items-center">
            <h1 className="text-2xl font-bold my-10 text-red-500">No Data Available</h1>
          </div>
        ) : (
         

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filtered.map((pokemon, index) => (
              <Link href={`/pokemon/${index + 1}`} key={pokemon.name}>
                <div className="bg-white p-4 rounded shadow hover:scale-105 transition text-center">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      index + 1
                    }.png`}
                    alt={pokemon.name}
                    className="mx-auto"
                  />
                  <p className="capitalize font-semibold mt-2">
                    {pokemon.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )
        
        }
      </div>
    </div>
  );
}
