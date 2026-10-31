import { useState } from 'react';

export default function VehicleSearch({ onSearch, value }) {
  const [search, setSearch] = useState(value);

  function submit(event) {
    event.preventDefault();
    onSearch(search.trim());
  }

  return (
    <form className="search-form" role="search" onSubmit={submit}>
      <label className="search-label" htmlFor="vehicle-search">
        Search inventory
      </label>
      <div className="search-control">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.5 4.5" />
        </svg>
        <input
          id="vehicle-search"
          type="search"
          maxLength={100}
          placeholder="Try Honda City, SUV, diesel…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}
