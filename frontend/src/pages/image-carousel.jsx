import React, { useState, useEffect } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(Array(images.length).fill(false));
  const [imageErrors, setImageErrors] = useState(Array(images.length).fill(false));

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7500);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleImageLoad = (index) => {
    const newIsLoaded = [...isLoaded];
    newIsLoaded[index] = true;
    setIsLoaded(newIsLoaded);

  };

  const handleImageError = (index) => {
    // Mark this image as having an error
    const newImageErrors = [...imageErrors];
    newImageErrors[index] = true;
    setImageErrors(newImageErrors);

    // Log the error for debugging
    console.error(`Failed to load image at index ${index}:`, images[index].src);
  };

  return (
    <div className="carousel-container position-relative">
      <div className="carousel-inner" style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "15px",
        height: "700px", // Increased height for larger images
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "100%",
        margin: "0 auto"
      }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? "active" : ""}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              backgroundColor: "#f0f0f0",
            }}
          >
            {!isLoaded[index] && !imageErrors[index] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#13547a",
                  fontWeight: "500"
                }}
              >

              </div>
            )}

            {imageErrors[index] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#d32f2f",
                  fontWeight: "500",
                  textAlign: "center"
                }}
              >
                <div>Image could not be loaded</div>
                <div style={{ fontSize: "14px", marginTop: "8px" }}>{image.src}</div>
              </div>
            )}

            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="d-block w-100 h-100"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                display: imageErrors[index] ? "none" : "block"
              }}
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
            />
            <div
              className="carousel-caption"
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                background: "linear-gradient(to top, rgba(12, 164, 161, 0.9), rgba(19, 84, 122, 0.7) 60%, rgba(27, 239, 211, 0))",
                padding: "30px 15px 15px",
                color: "white",
                textAlign: "left"
              }}
            >
              <h5 style={{ fontWeight: "600", marginBottom: "8px", fontSize: "24px" }}>{image.caption}</h5>
              <p style={{ fontSize: "16px", opacity: "0.9" }}>{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        onClick={goToPrev}
        style={{
          position: "absolute",
          top: "50%",
          left: "15px",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "50px", // Larger buttons
          height: "50px", // Larger buttons
          borderRadius: "50%",
          background: "#80d0c7",
          border: "none",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.94)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          transition: "background 0.3s ease",
          fontSize: "20px" // Larger icon
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "#13547a"}
        onMouseOut={(e) => e.currentTarget.style.background = "#80d0c7"}
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        onClick={goToNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "15px",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "50px", // Larger buttons
          height: "50px", // Larger buttons
          borderRadius: "50%",
          background: "#80d0c7",
          border: "none",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          transition: "background 0.3s ease",
          fontSize: "20px" // Larger icon
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "#13547a"}
        onMouseOut={(e) => e.currentTarget.style.background = "#80d0c7"}
      >
        <i className="bi bi-chevron-right"></i>
      </button>

      <div className="carousel-indicators" style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px",
        zIndex: 15,
        background: "rgba(255, 255, 255, 0.3)",
        padding: "5px 15px", // Larger padding
        borderRadius: "20px" // More rounded
      }}>
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            style={{
              width: "12px", // Larger dots
              height: "12px", // Larger dots
              borderRadius: "50%",
              border: "none",
              background: index === currentIndex ? "#13547a" : "rgba(255,255,255,0.8)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
