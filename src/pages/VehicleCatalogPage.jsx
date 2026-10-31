import { useEffect, useState } from 'react';
import StorefrontHeader from '../components/StorefrontHeader.jsx';
import VehicleGrid from '../components/VehicleGrid.jsx';
import VehicleSearch from '../components/VehicleSearch.jsx';
import { getVehicles } from '../lib/catalogApi.js';

export default function VehicleCatalogPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    getVehicles({ search, page, signal: controller.signal })
      .then(setCatalog)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [search, page, retryCount]);

  function updateSearch(value) {
    setPage(1);
    setSearch(value);
  }

  return (
    <div className="storefront">
      <StorefrontHeader />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> The ReVelo collection</p>
            <h1>Your next drive<br />starts <em>right here.</em></h1>
            <p className="hero-description">
              Explore sale-ready vehicles from dealerships across the ReVelo network.
              Find a vehicle that fits your life and the road ahead.
            </p>
            <a className="hero-cta" href="#inventory">
              Explore available cars <span aria-hidden="true">↓</span>
            </a>
            <div className="hero-points" aria-label="ReVelo vehicle selection">
              <span><b>01</b> Curated vehicles</span>
              <span><b>02</b> Dealer network</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="sun-disc" />
            <div className="art-ring" />
            <div className="road-line" />
            <svg viewBox="0 0 600 280">
              <path className="car-shadow" d="M75 224h455l-17 20H97z" />
              <path className="car-body" d="m94 192 22-53c6-15 18-23 36-25l99-11 60-62c10-11 23-16 39-16h91c20 0 34 8 46 25l52 74 31 16c14 7 22 17 22 34v26H94z" />
              <path className="car-window" d="m269 107 52-53c8-8 17-12 30-12h87c14 0 24 5 33 18l34 47z" />
              <path className="car-window" d="m234 108 12-1 1-1" />
              <path className="car-highlight" d="M112 169h111m247 0h61" />
              <circle className="car-wheel" cx="184" cy="208" r="37" />
              <circle className="wheel-center" cx="184" cy="208" r="16" />
              <circle className="car-wheel" cx="465" cy="208" r="37" />
              <circle className="wheel-center" cx="465" cy="208" r="16" />
            </svg>
            <div className="art-stamp"><span>REVelo</span><b>DRIVE WHAT'S NEXT</b></div>
          </div>
        </section>

        <section className="catalog-section" id="inventory" aria-labelledby="catalog-title">
          <div className="catalog-topline">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> Find your match</p>
              <h2 id="catalog-title">The collection<span>.</span></h2>
            </div>
            {catalog && (
              <p className="result-count">
                <strong>{catalog.total.toString().padStart(2, '0')}</strong>
                <span>vehicles available</span>
              </p>
            )}
          </div>
          <VehicleSearch onSearch={updateSearch} value={search} />

          {loading && (
            <div className="status-panel" role="status">
              <span className="loader" />
              Finding vehicles for you…
            </div>
          )}
          {!loading && error && (
            <div className="status-panel error-panel" role="alert">
              <p>{error}</p>
              <button className="text-button" onClick={() => setRetryCount((current) => current + 1)}>
                Try again
              </button>
            </div>
          )}
          {!loading && !error && catalog?.items.length > 0 && (
            <>
              <VehicleGrid vehicles={catalog.items} />
              {catalog.pages > 1 && (
                <nav className="pagination" aria-label="Vehicle listing pages">
                  <button
                    className="page-button"
                    disabled={page <= 1}
                    onClick={() => setPage((current) => current - 1)}
                  >
                    Previous
                  </button>
                  <span>
                    Page {catalog.page} of {catalog.pages}
                  </span>
                  <button
                    className="page-button"
                    disabled={page >= catalog.pages}
                    onClick={() => setPage((current) => current + 1)}
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
          {!loading && !error && catalog?.items.length === 0 && (
            <div className="status-panel empty-panel">
              <span className="empty-icon" aria-hidden="true">↗</span>
              <h3>No cars found just yet</h3>
              <p>
                {search
                  ? 'Try another make, model, or vehicle type.'
                  : 'New vehicles are added as dealerships prepare them for sale.'}
              </p>
            </div>
          )}
        </section>
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} ReVelo</span>
        <span>Better journeys start here.</span>
      </footer>
    </div>
  );
}
