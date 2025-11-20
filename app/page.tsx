"use client";

import { useState } from "react";
import { FiSun, FiMoon, FiSearch, FiGlobe } from "react-icons/fi";

interface SearchResult {
  path: string;
  score: number;
  title: string;
  html: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  // UI Theme Colors
  const bg = darkMode
    ? "linear-gradient(145deg, #050914, #0A0F1F)"
    : "linear-gradient(145deg, #F3F4F7, #FFFFFF)";

  const card = darkMode ? "rgba(17, 24, 41, 0.75)" : "rgba(255,255,255,0.8)";
  const text = darkMode ? "#E8ECF5" : "#1A1E27";
  const subtle = darkMode ? "#94A3B8" : "#6B7280";
  const border = darkMode ? "#1F2937" : "#E2E8F0";

  async function search(e: any) {
    e.preventDefault();
    if (!url || !query) return setError("Enter both URL and search query");

    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://websense-backend-eyi5.onrender.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, query }),
      });

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      setError("Failed to search");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        background: bg,
        minHeight: "100vh",
        padding: "70px 0",
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          width: "75%",
          maxWidth: "1100px",
          margin: "0 auto",
          background: card,
          borderRadius: "22px",
          padding: "44px 52px",
          boxShadow: darkMode
            ? "0 0 50px rgba(0,0,0,0.55)"
            : "0 20px 50px rgba(0,0,0,0.12)",
          backdropFilter: "blur(14px)",
          transition: "0.35s ease",
          position: "relative",
        }}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            background: darkMode ? "#1E293B" : "#E5E7EB",
            padding: "10px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            transition: "0.4s",
            transform: darkMode ? "rotate(0deg)" : "rotate(180deg)",
            boxShadow: darkMode
              ? "0 0 20px rgba(255,255,255,0.12)"
              : "0 0 12px rgba(0,0,0,0.12)",
          }}
        >
          {darkMode ? (
            <FiMoon size={20} color="#FCD34D" />
          ) : (
            <FiSun size={20} color="#1E293B" />
          )}
        </button>

        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            marginBottom: "6px",
            color: text,
            fontSize: "34px",
            fontWeight: 700,
          }}
        >
          Website Content Search
        </h1>

        <p
          style={{
            textAlign: "center",
            color: subtle,
            fontSize: "15px",
            marginBottom: "40px",
          }}
        >
          Search through website content with precision
        </p>

        {/* URL Input */}
        <form onSubmit={search}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
              background: darkMode ? "#0D1427" : "#FFFFFF",
              border: `1px solid ${border}`,
              borderRadius: "10px",
              padding: "12px 16px",
            }}
          >
            <FiGlobe size={16} color={subtle} />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "15px",
                color: text,
              }}
            />
          </div>

          {/* Query + Button */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                background: darkMode ? "#0D1427" : "#FFFFFF",
                border: `1px solid ${border}`,
                borderRadius: "10px",
                padding: "12px 16px",
              }}
            >
              <FiSearch size={16} color={subtle} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your search query..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "15px",
                  marginLeft: "10px",
                  color: text,
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: "#2563EB",
                color: "white",
                padding: "13px 30px",
                borderRadius: "10px",
                border: "none",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "0.25s",
                transform: loading ? "scale(0.93)" : "scale(1)",
                opacity: loading ? 0.85 : 1,
                boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
              }}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <p style={{ color: "#F87171", marginBottom: "10px" }}>{error}</p>
        )}

        {/* Results Title */}
        {results.length > 0 && (
          <h2 style={{ color: text, marginBottom: "16px", fontSize: "20px" }}>
            Search Results
          </h2>
        )}

        {/* Results */}
        {results.map((r, index) => {
          const scorePercent = (r.score * 100).toFixed(0);

          return (
            <div
              key={index}
              style={{
                background: darkMode ? "#0D1427" : "#FFFFFF",
                padding: "22px",
                borderRadius: "14px",
                border: `1px solid ${border}`,
                marginTop: "18px",
                boxShadow: darkMode
                  ? "0 0 18px rgba(255,255,255,0.04)"
                  : "0 4px 18px rgba(0,0,0,0.06)",
              }}
            >
              {/* Title Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <h3
                  style={{
                    color: text,
                    fontSize: "17px",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {r.title}
                </h3>

                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "999px",
                    background: "#D1FAE5",
                    color: "#065F46",
                    fontSize: "12px",
                    fontWeight: 600,
                    alignSelf: "center",
                  }}
                >
                  {scorePercent}% match
                </span>
              </div>

              <p
                style={{
                  color: subtle,
                  fontSize: "13px",
                  marginBottom: "8px",
                }}
              >
                Path: {r.path}
              </p>

              <details style={{ fontSize: "14px" }}>
                <summary
                  style={{
                    cursor: "pointer",
                    color: "#3B82F6",
                    fontWeight: 500,
                    marginBottom: "10px",
                  }}
                >
                  View HTML
                </summary>

                <pre
                  style={{
                    background: darkMode ? "#111827" : "#F2F4F7",
                    padding: "14px",
                    borderRadius: "10px",
                    border: `1px solid ${border}`,
                    color: darkMode ? "#D1D5DB" : "#1A1E27",
                    fontSize: "12.5px",
                    whiteSpace: "pre-wrap",
                    maxHeight: "280px",
                    overflowX: "auto",
                  }}
                >
                  {r.html}
                </pre>
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
}
