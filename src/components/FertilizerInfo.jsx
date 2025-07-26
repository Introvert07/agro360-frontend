import React, { useState } from "react";

const fertilizersData = [
  {
    name: "Urea",
    chemical: "46% Nitrogen (N)",
    crops: "Wheat, Rice, Maize, Cotton, Sugarcane",
    rate: "30–50 kg/acre",
    soilType: "All soils except highly alkaline",
  },
  {
    name: "Di-Ammonium Phosphate (DAP)",
    chemical: "18% N, 46% P₂O₅",
    crops: "Rice, Wheat, Pulses, Oilseeds",
    rate: "50–75 kg/acre",
    soilType: "Neutral to slightly acidic soils",
  },
  {
    name: "Muriate of Potash (MOP)",
    chemical: "60% K₂O",
    crops: "Sugarcane, Potato, Banana, Cotton",
    rate: "25–50 kg/acre",
    soilType: "Loamy and clay soils",
  },
  {
    name: "Single Super Phosphate (SSP)",
    chemical: "16% P₂O₅, 11% Sulphur",
    crops: "Pulses, Oilseeds, Groundnut",
    rate: "75–100 kg/acre",
    soilType: "Acidic to neutral soils",
  },
  {
    name: "NPK Complex (10:26:26 / 12:32:16)",
    chemical: "Balanced N, P, K",
    crops: "All major crops",
    rate: "50–75 kg/acre",
    soilType: "Suitable for all soil types",
  },
  {
    name: "Calcium Ammonium Nitrate (CAN)",
    chemical: "26% N, 8–10% Calcium",
    crops: "Horticulture crops, Vegetables, Paddy",
    rate: "40–60 kg/acre",
    soilType: "Acidic to neutral soils",
  },
  {
    name: "Zinc Sulphate",
    chemical: "21% Zn, 10–12% Sulphur",
    crops: "Paddy, Maize, Wheat",
    rate: "8–10 kg/acre",
    soilType: "Zinc-deficient or alkaline soils",
  },
  {
    name: "Magnesium Sulphate",
    chemical: "9.6% Mg, 12% Sulphur",
    crops: "Cotton, Citrus, Tomato",
    rate: "10–15 kg/acre",
    soilType: "Light soils low in magnesium",
  },
  {
    name: "Sulphur Bentonite",
    chemical: "90% Sulphur",
    crops: "Mustard, Onion, Garlic",
    rate: "8–10 kg/acre",
    soilType: "Alkaline soils",
  },
  {
    name: "Rock Phosphate",
    chemical: "25–30% Phosphorus",
    crops: "Long-term P source",
    rate: "100–150 kg/acre",
    soilType: "Acidic soils only",
  },
  {
    name: "Organic Manure (FYM, Vermicompost)",
    chemical: "0.5% N, 0.2% P, 0.5% K (approx.)",
    crops: "All crops",
    rate: "1–2 tons/acre",
    soilType: "All soils, improves texture",
  },
  {
    name: "Neem-Coated Urea",
    chemical: "46% N (Neem Coated)",
    crops: "Wheat, Paddy, Sugarcane",
    rate: "40–50 kg/acre",
    soilType: "All soil types, especially in leaching areas",
  },
  {
    name: "Rhizobium Biofertilizer",
    chemical: "Nitrogen-fixing bacteria",
    crops: "Pulses, Soybean",
    rate: "500 g/acre (seed treatment)",
    soilType: "Legume-growing soils",
  },
  {
    name: "Azospirillum",
    chemical: "Free-living N fixer",
    crops: "Maize, Millets",
    rate: "1 kg/acre (soil treatment)",
    soilType: "Neutral to slightly acidic soils",
  },
  {
    name: "PSB (Phosphate Solubilizing Bacteria)",
    chemical: "Solubilizes phosphorus",
    crops: "Sugarcane, Paddy",
    rate: "1 kg/acre (soil treatment)",
    soilType: "Phosphorus-fixing soils",
  },
  {
    name: "Mycorrhiza",
    chemical: "Symbiotic fungi",
    crops: "Fruits, Tea",
    rate: "2–3 kg/acre (pit application)",
    soilType: "Low-fertility soils",
  },
  {
    name: "Banana Special Mix",
    chemical: "6-12-30 + micronutrients",
    crops: "Banana",
    rate: "50 kg/acre",
    soilType: "Well-drained loamy soils",
  },
  {
    name: "Paddy Special",
    chemical: "20-20-0 + Zn/B",
    crops: "Paddy (Rice)",
    rate: "40–50 kg/acre",
    soilType: "Clay to loam soils in paddy fields",
  },
  {
    name: "Multi Micronutrient Liquid",
    chemical: "Fe, Zn, Mn, Cu (Chelated)",
    crops: "All crops",
    rate: "3–5 ml/liter",
    soilType: "Micronutrient-deficient soils",
  },
];

export default function FertilizersInfo() {
  const [search, setSearch] = useState("");

  const filteredData = fertilizersData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.chemical.toLowerCase().includes(search.toLowerCase()) ||
    item.crops.toLowerCase().includes(search.toLowerCase()) ||
    item.soilType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-10 min-h-screen bg-white px-6 md:px-20 py-12 text-gray-800">
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-10 mt-4 text-center tracking-wide">
        📋 Fertilizers Information
      </h1>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="🔍 Search by name, chemical, crop or soil type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300">
          <thead className="bg-green-100">
            <tr>
              <th className="text-left py-3 px-4 border-b border-green-300">Fertilizer</th>
              <th className="text-left py-3 px-4 border-b border-green-300">Chemical Composition</th>
              <th className="text-left py-3 px-4 border-b border-green-300">Recommended Crops</th>
              <th className="text-left py-3 px-4 border-b border-green-300">Rate (per acre)</th>
              <th className="text-left py-3 px-4 border-b border-green-300">Soil Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-green-50 transition">
                <td className="py-3 px-4 border-b border-green-200 font-semibold">{item.name}</td>
                <td className="py-3 px-4 border-b border-green-200">{item.chemical}</td>
                <td className="py-3 px-4 border-b border-green-200">{item.crops}</td>
                <td className="py-3 px-4 border-b border-green-200">{item.rate}</td>
                <td className="py-3 px-4 border-b border-green-200">{item.soilType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        📌 Note: Application rates may vary based on soil health and crop needs. Always consult a local agricultural officer for precision farming.
      </p>
    </div>
  );
}
