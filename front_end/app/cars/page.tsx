"use client";
import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { GetAllCars, RentCar } from "../../services/CarService";
import { Car } from "@/types/Car";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1e1e1e", // Cor de fundo escura
  border: "2px solid #555", // Borda mais suave
  boxShadow: 24,
  p: 4,
  color: "#fff", // Cor do texto padrão para branco
};

export default function CarsPage() {
  //modal
  const [open, setOpen] = React.useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const handleOpen = (car: Car) => {
    setSelectedCar(car);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  //

  const today = new Date().toISOString().split("T")[0];

  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    maxPrice: "",
  });
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

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

    // Buscar dados do usuário do localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.id) {
        setUserId(user.id);
      }
    }
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

  const handleConfirmRent = async () => {
    if (!selectedCar || !rentalDate || !returnDate) {
      alert("Por favor, selecione as datas de aluguel e entrega.");
      return;
    }

    if (!userId) {
      alert("Usuário não identificado. Por favor, faça o login novamente.");
      // Opcional: redirecionar para a página de login
      return;
    }

    const rentData = {
      startDate: new Date(rentalDate),
      endDate: new Date(returnDate),
      idClient: userId,
      idCar: selectedCar.id,
    };

    try {
      await RentCar(rentData);

      alert(`Carro ${selectedCar.carName} alugado com sucesso!`);
      handleClose(); // Fecha o modal
      // Opcional: Limpar os campos de data
      setRentalDate("");
      setReturnDate("");
    } catch (err) {
      console.log(rentData);
      console.error("Erro ao alugar o carro:", err);
      alert("Falha ao alugar o carro. Tente novamente.");
    }
  };
  //modal

  return (
    <div>
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

                <Button className="btn-rent" onClick={() => handleOpen(car)}>
                  Alugar
                </Button>
              </div>
            ))}
          </section>
        )}

        {/* No Results  */}
        {!loading && filteredCars.length === 0 && (
          <div className="no-results">
            <p>Nenhum carro encontrado com os filtros aplicados.</p>
            <button className="btn-link" onClick={handleClearFilters}>
              Limpar filtros e tentar novamente
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          cars.length === 0 &&
          filteredCars.length === 0 &&
          !error && (
            <div className="empty-state">
              <p>Nenhum carro disponível no momento.</p>
            </div>
          )}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "#fff" }}
            >
              Agendar Aluguel
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="rentalDate"
              label="Data de Aluguel"
              type="date"
              id="rentalDate"
              value={rentalDate}
              onChange={(e) => setRentalDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
                style: { color: "#ccc" }, // Cor do label
              }}
              inputProps={{
                style: { color: "#fff" }, // Cor do texto digitado
                min: today,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="returnDate"
              label="Data de Entrega"
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
                style: { color: "#ccc" }, // Cor do label
              }}
              inputProps={{
                style: { color: "#fff" }, // Cor do texto digitado
              }}
            />
            <Button
              onClick={handleConfirmRent}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirmar Aluguel
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
