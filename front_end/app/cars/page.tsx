"use client";
import React, { useEffect, useState, useCallback } from "react";
import { GetAllCars } from "../../services/CarService";
import { Car } from "@/types/Car";
import "./style.css";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    maxPrice: "",
  });

  // Fetch all cars on mount
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await GetAllCars();
        setCars(data);
        setFilteredCars(data);
      } catch (err) {
        console.error("Erro ao buscar carros:", err);
        setError("Erro ao carregar carros. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Filter cars when filters change
  useEffect(() => {
    let filtered = cars;

    if (filters.brand) {
      filtered = filtered.filter((car) =>
        car.carBrand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter((car) =>
        car.carCategory.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter((car) => car.Price <= maxPrice);
      }
    }

    setFilteredCars(filtered);
  }, [filters, cars]);

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({ brand: "", category: "", maxPrice: "" });
  }, []);

  return (
    <div className="cars-container">
      <header className="cars-header">
        <h1>Carros Disponíveis</h1>
        <p>Escolha o veículo perfeito para seu próximo passeio</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Filters Section */}
      <section className="filters-section">
        <h2>Filtros</h2>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="brand">Marca</label>
            <input
              id="brand"
              type="text"
              name="brand"
              placeholder="Ex: Toyota, Ford..."
              value={filters.brand}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category">Categoria</label>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="Ex: Sedan, SUV..."
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="maxPrice">Preço Máximo</label>
            <input
              id="maxPrice"
              type="number"
              name="maxPrice"
              placeholder="Ex: 100000"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <button className="btn-clear-filters" onClick={handleClearFilters}>
            Limpar Filtros
          </button>
        </div>
      </section>

      {/* Loading State */}
      {loading && <div className="loading">Carregando carros...</div>}

      {/* Cars Grid */}
      {!loading && filteredCars.length > 0 && (
        <section className="cars-grid">
          {filteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-header">
                <h3 className="car-title">
                  {car.carBrand} {car.carName}
                </h3>
                <span className="car-year">{car.Year}</span>
              </div>

              <div className="car-info">
                <div className="info-item">
                  <span className="label">Categoria:</span>
                  <span className="value">{car.carCategory}</span>
                </div>
                <div className="info-item">
                  <span className="label">Combustível:</span>
                  <span className="value">{car.fuelType}</span>
                </div>
                <div className="info-item">
                  <span className="label">Preço:</span>
                  <span className="value price">
                    R${" "}
                    {car.Price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              <button className="btn-rent">Alugar Agora</button>
            </div>
          ))}
        </section>
      )}

      {/* No Results */}
      {!loading && filteredCars.length === 0 && (
        <div className="no-results">
          <p>Nenhum carro encontrado com os filtros aplicados.</p>
          <button className="btn-link" onClick={handleClearFilters}>
            Limpar filtros e tentar novamente
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && cars.length === 0 && filteredCars.length === 0 && !error && (
        <div className="empty-state">
          <p>Nenhum carro disponível no momento.</p>
        </div>
      )}
    </div>
  );
}
