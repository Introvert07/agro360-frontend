import React, { useState } from "react";

const CropDoctorAPI = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [diagnosis, setDiagnosis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
            setDiagnosis(null);
        }
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>
                resolve(reader.result.replace(/^data:image\/[a-z]+;base64,/, ""));
            reader.onerror = (error) => reject(error);
        });

    const handleSubmit = async () => {
        if (!selectedFile) return;
        setLoading(true);

        try {
            const base64Image = await toBase64(selectedFile);

            const response = await fetch("https://api.plant.id/v2/identify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Api-Key": "oJJm2h3q0hbqaGgnGWLITRRxm3X9Gkk5LYY9dnZIi1cf4aBykr", // Replace with your key
                },
                body: JSON.stringify({
                    images: [base64Image],
                    modifiers: ["similar_images"],
                    plant_details: [
                        "common_names",
                        "url",
                        "wiki_description",
                        "taxonomy",
                        "synonyms",
                    ],
                }),
            });

            const data = await response.json();
            console.log("Diagnosis response:", data);

            if (data?.suggestions?.length > 0) {
                const suggestion = data.suggestions[0];
                const details = suggestion.plant_details;

                setDiagnosis({
                    name: suggestion.plant_name,
                    probability: (suggestion.probability * 100).toFixed(2) + "%",
                    description: details?.wiki_description?.value || "No description available.",
                    commonNames: details?.common_names?.join(", ") || "N/A",
                    taxonomy: details?.taxonomy || {},
                    url: details?.url || null,
                });
            } else {
                setDiagnosis("No diagnosis found.");
            }
        } catch (error) {
            console.error("Error:", error);
            setDiagnosis("Error during diagnosis.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🌿 Crop Doctor</h1>

            <label
                htmlFor="File"
                className="flex flex-col items-center rounded border border-gray-300 p-4 text-gray-900 shadow-sm sm:p-6"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                    />
                </svg>

                <span className="mt-4 font-medium"> Upload your file(s) </span>

                <span
                    className="mt-2 inline-block rounded border border-gray-200 bg-gray-50 px-3 py-1.5 text-center text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100"
                >
                    Browse files
                </span>

                <input multiple type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ marginBottom: "10px" }} id="File" className="sr-only" />
            </label>
            {/* <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "10px" }}
      /> */}

            {previewImage && (
                <div style={{ marginBottom: "15px" }} className="rounded-md">
                    <img
                        className="w-full h-72 object-cover pt-6 rounded-md"
                        src={previewImage}
                        alt="Preview"
                        style={{ width: "100%", borderRadius: "10px" }}
                    />
                    <br />
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            marginTop: "10px",
                            padding: "8px 16px",
                            background: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        {loading ? "Diagnosing..." : "Submit"}
                    </button>
                </div>
            )}

            {diagnosis && typeof diagnosis === "object" ? (
                <div
                className="text-start"
                    style={{
                        background: "#f0f0f0",
                        padding: "15px",
                        borderRadius: "10px",
                        marginTop: "20px",
                    }}
                >
                    <h3>🌱 Diagnosis Result</h3>
                    <p><strong>Plant Name:</strong> {diagnosis.name}</p>
                    <p><strong>Common Names:</strong> {diagnosis.commonNames}</p>
                    <p><strong>Confidence:</strong> {diagnosis.probability}</p>
                    <p><strong>Description:</strong> {diagnosis.description}</p>

                    {diagnosis.taxonomy && (
                        <div>
                            <p><strong>Family:</strong> {diagnosis.taxonomy.family}</p>
                            <p><strong>Genus:</strong> {diagnosis.taxonomy.genus}</p>
                            <p><strong>Order:</strong> {diagnosis.taxonomy.order}</p>
                        </div>
                    )}

                    {diagnosis.url && (
                        <p>
                            <a href={diagnosis.url} target="_blank" rel="noopener noreferrer" className="text-blue-600"> 
                                More Info 🔗
                            </a>
                        </p>
                    )}
                </div>
            ) : (
                typeof diagnosis === "string" && <p>{diagnosis}</p>
            )}
        </div>
    );
};

export default CropDoctorAPI;
