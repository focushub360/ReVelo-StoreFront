import VehicleCard from './VehicleCard.jsx';

export default function VehicleGrid({ vehicles }) {
  return (
    <div className="vehicle-grid">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
