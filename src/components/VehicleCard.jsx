import { useState } from 'react';

const formatPrice = (price) =>
  price == null
    ? 'Price on request'
    : new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(price);

const formatOdometer = (odometer) =>
  odometer == null ? '—' : `${new Intl.NumberFormat('en-IN').format(odometer)} km`;

export default function VehicleCard({ vehicle }) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = vehicle.images[0];
  const title = [vehicle.make, vehicle.model, vehicle.variant].filter(Boolean).join(' ');

  return (
    <article className="vehicle-card">
      <div className="vehicle-image">
        {image && !imageFailed ? (
          <img
            src={image.url}
            alt={`${title} vehicle`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="image-placeholder" aria-label="No vehicle image available">
            <svg viewBox="0 0 120 80" aria-hidden="true">
              <path d="m18 48 7-18c2-5 5-7 11-7h42c5 0 9 2 12 7l11 18v15H18z" />
              <path d="m31 43 5-13h40l8 13zM18 48h83M31 63a8 8 0 1 0 16 0m26 0a8 8 0 1 0 16 0" />
            </svg>
          </div>
        )}
        <span className="ready-tag"><i aria-hidden="true" /> Available now</span>
      </div>
      <div className="vehicle-content">
        <div className="vehicle-heading">
          <div>
            <p className="vehicle-year">{vehicle.year || 'Year not listed'} <span>·</span> ReVelo verified</p>
            <h2>{title || 'Vehicle listing'}</h2>
          </div>
          <p className="vehicle-price">{formatPrice(vehicle.price)}</p>
        </div>
        <div className="vehicle-specs">
          <span>{formatOdometer(vehicle.odometer)}</span>
          <span>{vehicle.fuelType || 'Fuel not listed'}</span>
          <span>{vehicle.transmission || 'Transmission not listed'}</span>
        </div>
        {vehicle.dealer && (
          <p className="dealer-location">
            <span aria-hidden="true">⌖</span>
            {[vehicle.dealer.name, vehicle.dealer.city, vehicle.dealer.state]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
      </div>
    </article>
  );
}
