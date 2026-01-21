import { useEffect, useState } from "react"
import { useTransactionContext } from "../hooks/useTransactionContext"
import { useStockTakeContext } from "../hooks/useStockTakeContext"

const LiveDataShowcase = () => {
  const { transactions } = useTransactionContext()
  const { stockTakes } = useStockTakeContext()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [allData, setAllData] = useState([])

  useEffect(() => {
    // Combine transactions and stock takes into a single array with origin info
    const combined = [
      ...(transactions || []).map(t => ({
        ...t,
        origin: "Transaction",
        originColor: "#10b981",
        originBg: "#ecfdf5",
        title: t.item_name || "Unnamed Transaction",
        description: `${t.type.toUpperCase()} - ${t.qty} units`
      })),
      ...(stockTakes || []).map(s => ({
        ...s,
        origin: "Stock Take",
        originColor: "#3b82f6",
        originBg: "#eff6ff",
        title: s.item_name || "Unnamed Stock Take",
        description: `${s.qty} units at ${s.location || "N/A"}`
      }))
    ]
    
    // Sort by most recent first
    combined.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
    
    setAllData(combined)
    setCurrentSlide(0)
  }, [transactions, stockTakes])

  useEffect(() => {
    if (allData.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % allData.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [allData.length])

  if (allData.length === 0) {
    return (
      <div className="showcase-container" style={styles.container}>
        <div style={styles.emptyState}>
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>No data to display yet</p>
        </div>
      </div>
    )
  }

  const current = allData[currentSlide]
  const lastModified = new Date(current.createdAt || current.date)
  const formattedDate = lastModified.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })

  return (
    <div className="showcase-container" style={styles.container}>
      <div style={styles.slideWrapper}>
        {/* Animated slide */}
        <div style={{ ...styles.slide, opacity: 1 }}>
          <div style={styles.content}>
            <div style={styles.header}>
              <h3 style={styles.title}>{current.title}</h3>
              <div
                style={{
                  ...styles.badge,
                  backgroundColor: current.originBg,
                  color: current.originColor
                }}
              >
                {current.origin}
              </div>
            </div>

            <p style={styles.description}>{current.description}</p>

            <div style={styles.metadata}>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Last Modified:</span>
                <span style={styles.metaValue}>{formattedDate}</span>
              </div>
              {current.createdBy && (
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>Modified By:</span>
                  <span style={styles.metaValue}>{current.createdBy}</span>
                </div>
              )}
            </div>
          </div>

          {/* Slide indicators */}
          <div style={styles.indicatorContainer}>
            {allData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  ...styles.indicator,
                  backgroundColor: index === currentSlide ? "#262f3e" : "#d1d5db",
                  opacity: index === currentSlide ? 1 : 0.4
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentSlide(prev => (prev - 1 + allData.length) % allData.length)}
        style={{ ...styles.navButton, left: "16px" }}
        title="Previous slide"
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(38, 47, 62, 0.9)"
          e.target.style.color = "white"
          e.target.style.transform = "translateY(-50%) scale(1.1)"
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.9)"
          e.target.style.color = "#262f3e"
          e.target.style.transform = "translateY(-50%) scale(1)"
        }}
      >
        ◀
      </button>
      <button
        onClick={() => setCurrentSlide(prev => (prev + 1) % allData.length)}
        style={{ ...styles.navButton, right: "16px" }}
        title="Next slide"
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(38, 47, 62, 0.9)"
          e.target.style.color = "white"
          e.target.style.transform = "translateY(-50%) scale(1.1)"
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.9)"
          e.target.style.color = "#262f3e"
          e.target.style.transform = "translateY(-50%) scale(1)"
        }}
      >
        ▶
      </button>
    </div>
  )
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #f0f7ff 0%, #f5f1ff 100%)",
    borderRadius: "var(--border-radius, 12px)",
    padding: "24px 80px",
    marginBottom: "24px",
    boxShadow: "0 4px 15px rgba(40, 54, 80, 0.08)",
    position: "relative",
    overflow: "visible",
    minHeight: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  slideWrapper: {
    position: "relative",
    width: "100%",
    minHeight: "180px",
    display: "flex",
    alignItems: "center"
  },
  slide: {
    animation: "fadeIn 0.5s ease-in-out",
    width: "100%"
  },
  content: {
    background: "white",
    padding: "20px",
    borderRadius: "var(--border-radius, 10px)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
    gap: "12px"
  },
  title: {
    margin: "0",
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    flex: 1
  },
  badge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    flexShrink: 0
  },
  description: {
    margin: "0 0 16px 0",
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: "1.5"
  },
  metadata: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    paddingTop: "12px",
    borderTop: "1px solid #e5e7eb"
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  metaLabel: {
    fontSize: "12px",
    color: "#9ca3af",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  metaValue: {
    fontSize: "13px",
    color: "#374151",
    fontWeight: "500"
  },
  indicatorContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "16px",
    flexWrap: "wrap"
  },
  indicator: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: "0"
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255, 255, 255, 0.9)",
    border: "2px solid #262f3e",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    backdropFilter: "blur(8px)",
    zIndex: 10,
    color: "#262f3e",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px"
  }
}

export default LiveDataShowcase
