"use client";
import React, { useEffect, useState, useCallback } from "react";
import { getAllCars } from "../../services/CarService";
import { RentCar } from "@/services/CarService"; 
import { Car } from "@/types/car/Car";
import { HeaderPageClients } from "@/components/headerPageClient";
import { HeaderPageAdmin } from "@/components/headerPageAdmin";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

import styles from "./style.module.css";

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

const MOCK_CARS_DATA: Car[] = [
    { id: 1, carName: "Corolla", carBrand: "Toyota", carCategory: "Sedan", fuelType: "Híbrido", Year: 2023, Price: 250.00 },
    { id: 2, carName: "Civic", carBrand: "Honda", carCategory: "Sedan", fuelType: "Gasolina", Year: 2022, Price: 230.00 },
    { id: 3, carName: "Compass", carBrand: "Jeep", carCategory: "SUV", fuelType: "Flex", Year: 2024, Price: 350.00 },
    { id: 4, carName: "Mobi", carBrand: "Fiat", carCategory: "Hatch", fuelType: "Flex", Year: 2021, Price: 90.00 },
    { id: 5, carName: "Mustang", carBrand: "Ford", carCategory: "Esportivo", fuelType: "Gasolina", Year: 2020, Price: 850.00 },
];

export default function CarsPage() {
  const [userType, setUserType] = useState<string | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filtros
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    maxPrice: "",
  });

  // Datas do aluguel
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Usuário logado
  const [userId, setUserId] = useState<number | null>(null);

  // Estado do modal e carro selecionado
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Data mínima (hoje) para o input de data
  const today = new Date().toISOString().slice(0, 10);

  // Handlers do modal
  const handleOpen = (car: Car) => {
    setSelectedCar(car);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedCar(null);
  };

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
    const loadCars = async () => {
        try {
          setLoading(true);
          setError("");
          // const data = await getAllCars();

          setCars(MOCK_CARS_DATA);
          setFilteredCars(MOCK_CARS_DATA);
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
    const userType = localStorage.getItem("userType");
    if (storedUser && userType === "cliente") {
      const user = JSON.parse(storedUser);
      if (user && user.id) {
        setUserId(user.id);
      }
    } else if (userType === "administrador") {
      setUserId(null);
    }
  }, []);

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
      return;
    }
    if (!selectedCar.id || selectedCar.id <= 0) {
      alert("Erro: ID do carro inválido. Recarregue a página e tente novamente.");
      return;
    }
    
    const startDate = new Date(`${rentalDate}T00:00:00Z`);
    const endDate   = new Date(`${returnDate}T00:00:00Z`);

    const rentData = {
      StartDate: startDate.toISOString(),
      EndDate: endDate.toISOString(),
      idClient: userId,
      idCar: selectedCar.id,
    };

    try {
      console.log("Tentando alugar carro com dados:", rentData);
      const response = await RentCar(rentData);
      console.log("Resposta do servidor:", response);
      alert(`Carro ${selectedCar.carName} alugado com sucesso!`);
      handleClose();
      setRentalDate("");
      setReturnDate("");
    } catch (err: any) {
      console.error("Erro ao alugar o carro:", err);
      console.error("Dados enviados:", rentData);

      if (err.response?.data?.error?.code === 'P2003') {
        alert(`Erro: O carro selecionado não existe no sistema. ID do carro: ${selectedCar.id}`);
      } else if (err.response?.data?.message) {
        alert(`Erro: ${err.response.data.message}`);
      } else {
        alert("Falha ao alugar o carro. Verifique os dados e tente novamente.");
      }
    }
  };

  return (
    <div className={styles["home-scope"]}>
      {userType === "administrador" ? <HeaderPageAdmin /> : <HeaderPageClients/>}
      <div className={styles["cars-container"]}>
        <header className={styles["cars-header"]}>
          <h1>Carros Disponíveis</h1>
          <p>Escolha o veículo perfeito para seu próximo passeio</p>
        </header>

        {error && <div className={`${styles.alert} ${styles["alert-error"]}`}>{error}</div>}

        {/* Filters Section */}
        <section className={styles["filters-section"]}>
          <h2>Filtros</h2>
          <div className={styles["filters-grid"]}>
            <div className={styles["filter-group"]}>
              <label htmlFor="brand">Marca</label>
              <input
                id="brand"
                type="text"
                name="brand"
                placeholder="Ex: Toyota, Ford..."
                value={filters.brand}
                onChange={handleFilterChange}
                className={styles["filter-input"]}
              />
            </div>

            <div className={styles["filter-group"]}>
              <label htmlFor="category">Categoria</label>
              <input
                id="category"
                type="text"
                name="category"
                placeholder="Ex: Sedan, SUV..."
                value={filters.category}
                onChange={handleFilterChange}
                className={styles["filter-input"]}
              />
            </div>

            <div className={styles["filter-group"]}>
              <label htmlFor="maxPrice">Preço Máximo</label>
              <input
                id="maxPrice"
                type="number"
                name="maxPrice"
                placeholder="Ex: 100000"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className={styles["filter-input"]}
              />
            </div>

            <button className={styles["btn-clear-filters"]} onClick={handleClearFilters}>
              Limpar Filtros
            </button>
          </div>
        </section>

        {/* Loading State */}
        {loading && <div className={styles["loading"]}>Carregando carros...</div>}

        {/* Cars Grid */}
        {!loading && filteredCars.length > 0 && (
          <section className={styles["cars-grid"]}>
            {filteredCars.map((car) => (
              <div key={car.id} className={styles["car-card"]}>
                <div className={styles["car-header"]}>
                  <h3 className={styles["car-title"]}>
                    {car.carBrand} {car.carName}
                  </h3>
                  <span className={styles["car-year"]}>{car.Year}</span>
                </div>
                <div className={styles["car-info"]}>
                  <div className={styles["info-item"]}>
                    <span className={styles["label"]}>Categoria:</span>
                    <span className={styles["value"]}>{car.carCategory}</span>
                  </div>
                  <div className={styles["info-item"]}>
                    <span className={styles["label"]}>Combustível:</span>
                    <span className={styles["value"]}>{car.fuelType}</span>
                  </div>
                  <div className={styles["info-item"]}>
                    <span className={styles["label"]}>Preço:</span>
                    <span className={styles["value"] + " " + styles["price"]}>
                      R${" "}
                      {car.Price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                {userType === "cliente" ? (
                  <Button className={styles["btn-rent"]} onClick={() => handleOpen(car)}>
                    Alugar
                  </Button>
                ) : userType === "administrador" ? (
                  <div className={styles["admin-notice"]}>
                    <span className={styles["admin-text"]}>Área exclusiva para clientes</span>
                  </div>
                ) : (
                  <Button className={styles["btn-rent"]} disabled>
                    Faça login para alugar
                  </Button>
                )}
              </div>
            ))}
          </section>
        )}

        {/* No Results */}
        {!loading && filteredCars.length === 0 && (
          <div className={styles["no-results"]}>
            <p>Nenhum carro encontrado com os filtros aplicados.</p>
            <button className={styles["btn-link"]} onClick={handleClearFilters}>
              Limpar filtros e tentar novamente
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && cars.length === 0 && filteredCars.length === 0 && !error && (
          <div className={styles["empty-state"]}>
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
