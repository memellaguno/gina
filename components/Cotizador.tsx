"use client";

import { useState, useEffect, useCallback } from "react";

type ProductType = "1" | "2" | "3";

interface PayCalculation {
  interesmensual: number;
  cuotaCapital: number;
  cuotamensual: number;
}

interface PlusCalculation {
  cuotaMensual: number;
  comision: number;
}

interface FlexCalculation {
  totalPagar: number;
  tipoCambio: number;
}

export default function Cotizador() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>("1");

  // Pay states
  const [montoPay, setMontoPay] = useState<number>(0);
  const [plazoPay, setPlazoPay] = useState<number>(1);
  const [tasaPay] = useState<number>(2.0);
  const [payResults, setPayResults] = useState<PayCalculation>({
    interesmensual: 0,
    cuotaCapital: 0,
    cuotamensual: 0,
  });

  // Plus states
  const [montoPlus, setMontoPlus] = useState<number>(0);
  const [plazoPlus, setPlazoPlus] = useState<number>(3);
  const [plusResults, setPlusResults] = useState<PlusCalculation>({
    cuotaMensual: 0,
    comision: 0,
  });

  // Flex states
  const [montoFlex, setMontoFlex] = useState<number>(0);
  const [tipoOperacion, setTipoOperacion] = useState<number>(1);
  const [plazoFlex, setPlazoFlex] = useState<number>(1);
  const [flexResults, setFlexResults] = useState<FlexCalculation>({
    totalPagar: 0,
    tipoCambio: 0,
  });

  const formatNumberWithCommas = useCallback((number: number): string => {
    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, []);

  const calcularPay = useCallback(() => {
    if (montoPay <= 0 || plazoPay <= 0) return;

    const tasaComision = 0.02 * 12;
    const interesDiario = (montoPay * tasaComision) / 360;
    const interesMensual = parseFloat(interesDiario.toFixed(2)) * 30;
    const cuotaCapital = montoPay / plazoPay;
    const cuotaMensual = interesMensual + cuotaCapital;

    setPayResults({
      interesmensual: interesMensual,
      cuotaCapital: cuotaCapital,
      cuotamensual: cuotaMensual,
    });
  }, [montoPay, plazoPay]);

  const calcularPlus = useCallback(() => {
    if (montoPlus <= 0) return;

    const tasa_plus = 0.3;
    const interesDiario_plus = (montoPlus * tasa_plus) / 360;
    const interesDiario_plus_red = parseFloat(interesDiario_plus.toFixed(2));
    const comision = montoPlus * 0.02 * 1.16; // 2% de comisión con iva

    const cuotaMensual = interesDiario_plus_red * 30;

    setPlusResults({
      cuotaMensual: cuotaMensual,
      comision: comision,
    });
  }, [montoPlus]);

  const calcularFlex = useCallback(async () => {
    if (montoFlex <= 0 || plazoFlex <= 0) return;

    try {
      const response = await fetch(
        "https://api.currencyfreaks.com/latest?apikey=06d1f20f605e40029fd9a459051863aa&symbols=MXN",
      );
      const data = await response.json();
      const cambio = parseFloat(data.rates.MXN);

      let cambio_final: number;
      let totalPagar: number;

      if (tipoOperacion === 1) {
        cambio_final = cambio + (0.02 * plazoFlex + 0.001);
        totalPagar = montoFlex * cambio_final;
      } else {
        cambio_final = cambio - (0.02 * plazoFlex + 0.001);
        totalPagar = montoFlex / cambio_final;
      }

      setFlexResults({
        totalPagar: totalPagar,
        tipoCambio: cambio_final,
      });
    } catch (error) {
      console.error("Error al obtener el tipo de cambio:", error);
      setFlexResults({
        totalPagar: 0,
        tipoCambio: 0,
      });
    }
  }, [montoFlex, tipoOperacion, plazoFlex]);

  // Effect hooks for calculations
  useEffect(() => {
    calcularPay();
  }, [calcularPay]);

  useEffect(() => {
    calcularPlus();
  }, [calcularPlus]);

  useEffect(() => {
    calcularFlex();
  }, [calcularFlex]);

  return (
    <div className="px- bg-white text-gray-800 md:px-0">
      <h1 className="my-5 px-4 text-center text-2xl font-bold text-[#04aa6d] md:text-3xl">
        Cotizador
      </h1>

      <div className="mx-auto mb-6 w-full max-w-xs px-4 md:mb-8 md:max-w-sm md:px-0">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value as ProductType)}
          className="w-full rounded-lg border border-[#04aa6d] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#04aa6d] md:text-base"
        >
          <option value="1">Superia Pay</option>
          <option value="2">Superia Plus</option>
          <option value="3">Superia Flex</option>
        </select>
      </div>

      {/* Superia Pay */}
      {selectedProduct === "1" && (
        <div className="flex flex-col flex-wrap justify-center gap-4 p-4 md:flex-row md:gap-5 md:p-5">
          <div className="w-full rounded-lg border border-gray-300 bg-white p-4 shadow-md md:w-full md:max-w-sm md:p-5">
            <h2 className="mb-4 text-lg font-semibold text-[#04aa6d] md:mb-5 md:text-xl">
              Datos
            </h2>

            <label
              htmlFor="monto_pay"
              className="mb-2 block text-sm font-bold md:text-base"
            >
              Monto
            </label>
            <input
              type="number"
              id="monto_pay"
              min="5000"
              step="1000"
              placeholder="Escribe el monto"
              value={montoPay || ""}
              onChange={(e) => setMontoPay(Number(e.target.value))}
              className="mb-3 w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#04aa6d] md:mb-4 md:p-2.5 md:text-base"
            />

            <label
              htmlFor="plazo_pay"
              className="mb-2 block text-sm font-bold md:text-base"
            >
              Plazo (en meses)
            </label>
            <select
              id="plazo_pay"
              value={plazoPay}
              onChange={(e) => setPlazoPay(Number(e.target.value))}
              className="mb-3 w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#04aa6d] md:mb-4 md:p-2.5 md:text-base"
            >
              <option value="1">1 mes</option>
              <option value="2">2 meses</option>
              <option value="3">3 meses</option>
              <option value="4">4 meses</option>
              <option value="5">5 meses</option>
              <option value="6">6 meses</option>
            </select>

            <label
              htmlFor="tasa_pay"
              className="mb-2 block text-sm font-bold md:text-base"
            >
              Tasa mensual (%)
            </label>
            <select
              id="tasa_pay"
              className="mb-3 w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#04aa6d] md:mb-4 md:p-2.5 md:text-base"
              disabled
            >
              <option value="2.0">2.0%</option>
            </select>
          </div>

          <div className="w-full rounded-lg border border-gray-300 bg-white p-4 shadow-md md:w-full md:max-w-sm md:p-5">
            <h2 className="mb-4 text-lg font-semibold text-[#04aa6d] md:mb-5 md:text-xl">
              Resultados
            </h2>
            <div>
              <p className="my-3 text-sm md:my-4 md:text-base">
                Interés mensual:{" "}
                <span className="mt-1 block font-bold text-[#04aa6d] md:mt-0 md:inline">
                  ${formatNumberWithCommas(payResults.interesmensual)}
                </span>
              </p>
              <p className="my-3 text-sm md:my-4 md:text-base">
                Cuota capital:{" "}
                <span className="mt-1 block font-bold text-[#04aa6d] md:mt-0 md:inline">
                  ${formatNumberWithCommas(payResults.cuotaCapital)}
                </span>
              </p>
              <p className="my-3 text-sm md:my-4 md:text-base">
                Cuota mensual:{" "}
                <span className="mt-1 block font-bold text-[#04aa6d] md:mt-0 md:inline">
                  ${formatNumberWithCommas(payResults.cuotamensual)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Superia Plus */}
      {selectedProduct === "2" && (
        <div className="flex flex-col flex-wrap justify-center gap-4 p-4 md:flex-row md:gap-5 md:p-5">
          <div className="w-full max-w-sm rounded-lg border border-gray-300 bg-white p-5 shadow-md">
            <h2 className="mb-5 text-xl font-semibold text-[#04aa6d]">Datos</h2>

            <label htmlFor="monto_plus" className="mb-2 block font-bold">
              Monto solicitado
            </label>
            <input
              type="number"
              id="monto_plus"
              min="5000"
              step="1000"
              placeholder="Escribe el monto"
              value={montoPlus || ""}
              onChange={(e) => setMontoPlus(Number(e.target.value))}
              className="mb-4 w-full rounded-lg border border-gray-300 p-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#04aa6d]"
            />

            <label htmlFor="plazo_plus" className="mb-2 block font-bold">
              Plazo (en meses)
            </label>
            <select
              id="plazo_plus"
              value={plazoPlus}
              onChange={(e) => setPlazoPlus(Number(e.target.value))}
              className="mb-4 w-full rounded-lg border border-gray-300 p-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#04aa6d]"
            >
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="18">18 meses</option>
              <option value="24">24 meses</option>
              <option value="30">30 meses</option>
              <option value="36">36 meses</option>
            </select>
          </div>

          <div className="w-full rounded-lg border border-gray-300 bg-white p-4 shadow-md md:w-full md:max-w-sm md:p-5">
            <h2 className="mb-4 text-lg font-semibold text-[#04aa6d] md:mb-5 md:text-xl">
              Resultados
            </h2>
            <div>
              <p className="my-3 text-sm md:my-4 md:text-base">
                Cuota mensual aproximada:{" "}
                <span className="mt-1 block font-bold text-[#04aa6d] md:mt-0 md:inline">
                  ${formatNumberWithCommas(plusResults.cuotaMensual)}
                </span>
              </p>
              <p className="my-3 text-sm md:my-4 md:text-base">
                Comisión (2%):{" "}
                <span className="mt-1 block font-bold text-[#04aa6d] md:mt-0 md:inline">
                  ${formatNumberWithCommas(plusResults.comision)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Superia Flex */}
      {selectedProduct === "3" && (
        <div className="flex flex-col flex-wrap justify-center gap-4 p-4 md:flex-row md:gap-5 md:p-5">
          <div className="w-full rounded-lg border border-gray-300 bg-white p-4 shadow-md md:w-full md:max-w-sm md:p-5">
            <h2 className="mb-4 text-lg font-semibold text-[#04aa6d] md:mb-5 md:text-xl">
              Datos
            </h2>

            <label
              htmlFor="monto_flex"
              className="mb-2 block text-sm font-bold md:text-base"
            >
              Monto solicitado
            </label>
            <input
              type="number"
              id="monto_flex"
              min="5000"
              step="1000"
              placeholder="Escribe el monto"
              value={montoFlex || ""}
              onChange={(e) => setMontoFlex(Number(e.target.value))}
              className="mb-3 w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#04aa6d] md:mb-4 md:p-2.5 md:text-base"
            />

            <label
              htmlFor="tipo_currency"
              className="mb-2 block text-sm font-bold md:text-base"
            >
              Tipo de Operación
            </label>
            <select
              id="currency"
              value={tipoOperacion}
              onChange={(e) => setTipoOperacion(Number(e.target.value))}
              className="mb-3 w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#04aa6d] md:mb-4 md:p-2.5 md:text-base"
            >
              <option value="1">Venta</option>
              <option value="2">Compra</option>
            </select>

            <label
              htmlFor="plazo"
              className="mb-2 block text-sm font-bold md:text-base"
            >
              Plazo (días)
            </label>
            <input
              type="number"
              id="plazo_flex"
              min="1"
              max="45"
              placeholder="Escribe el plazo"
              value={plazoFlex || ""}
              onChange={(e) => setPlazoFlex(Number(e.target.value))}
              className="mb-3 w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#04aa6d] md:mb-4 md:p-2.5 md:text-base"
            />

            <label
              htmlFor="cambio"
              className="mb-2 block text-sm font-bold md:text-base"
            >
              Cambio
            </label>
            <span className="text-sm font-semibold text-[#04aa6d] md:text-base">
              ${formatNumberWithCommas(flexResults.tipoCambio)}
            </span>
          </div>

          <div className="w-full rounded-lg border border-gray-300 bg-white p-4 shadow-md md:w-full md:max-w-sm md:p-5">
            <h2 className="mb-4 text-lg font-semibold text-[#04aa6d] md:mb-5 md:text-xl">
              Resultados
            </h2>
            <div>
              <p className="my-3 text-sm md:my-4 md:text-base">
                Total a pagar:{" "}
                <span className="mt-1 block font-bold text-[#04aa6d] md:mt-0 md:inline">
                  ${formatNumberWithCommas(flexResults.totalPagar)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
