"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useDeferredValue, useState } from "react";
import type { HomeSearchBuilding } from "@/lib/types";

type HomeSearchProps = {
  buildings: HomeSearchBuilding[];
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function getMatches(buildings: HomeSearchBuilding[], query: string) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  const startsWithMatches = buildings.filter((building) =>
    normalize(building.name).startsWith(normalizedQuery)
  );

  const includesMatches = buildings.filter((building) => {
    const buildingName = normalize(building.name);
    return !buildingName.startsWith(normalizedQuery) && buildingName.includes(normalizedQuery);
  });

  return [...startsWithMatches, ...includesMatches].slice(0, 6);
}

export function HomeSearch({ buildings }: HomeSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);
  const matches = getMatches(buildings, deferredQuery);

  function openBuilding(slug: string) {
    setError(null);
    startTransition(() => {
      router.push(`/buildings/${slug}`);
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedQuery = normalize(query);
    if (!normalizedQuery) {
      setError("Enter a building name to jump to a dorm page.");
      return;
    }

    const exactMatch =
      buildings.find((building) => normalize(building.name) === normalizedQuery) ?? matches[0];

    if (!exactMatch) {
      setError(`No building matched "${query.trim()}".`);
      return;
    }

    openBuilding(exactMatch.slug);
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="panel-strong p-3 sm:p-4">
        <label htmlFor="home-building-search" className="sr-only">
          Search for a building
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="home-building-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (error) {
                setError(null);
              }
            }}
            placeholder="Search by building name, like Yang Hall"
            className="field flex-1"
          />
          <button type="submit" className="btn-primary shrink-0 px-6">
            Search
          </button>
        </div>
      </form>

      {error ? <p className="feedback-error">{error}</p> : null}

      {matches.length > 0 ? (
        <div className="panel flex flex-wrap gap-2 px-4 py-3">
          {matches.map((building) => (
            <button
              key={building.id}
              type="button"
              onClick={() => openBuilding(building.slug)}
              className="rounded-full border border-[color:var(--border)] bg-white/90 px-4 py-2 text-left text-sm transition hover:border-[color:rgba(166,34,49,0.18)] hover:bg-white"
            >
              <span className="font-semibold text-[color:var(--foreground)]">{building.name}</span>
              <span className="ml-2 text-[color:var(--muted)]">{building.quadName}</span>
            </button>
          ))}
        </div>
      ) : null}

      <p className="text-sm text-[color:var(--muted)]">
        Try a hall name like `Yang`, `Tubman`, or `West A`, or{" "}
        <Link href="/quads" className="font-semibold text-[color:var(--brand-deep)]">
          browse all communities
        </Link>
        .
      </p>
    </div>
  );
}
