import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGalleryComponent = () => {
  const images = [
    {
      original: "/images/promo1.png",
      thumbnail: "/images/promo1.png",
    },
    {
      original: "/images/promo2.png",
      thumbnail: "/images/promo2.png",
    },
    {
      original: "/images/promo3.png",
      thumbnail: "/images/promo3.png",
    },
    {
      original: "/images/facturacion.png",
      thumbnail: "/images/facturacion.png",
    },
  ];

  // Función personalizada para renderizar las imágenes
  const renderCustomItem = (item) => {
    return (
      <div className="image-container">
        <img
          src={item.original}
          alt="Gallery"
          className="w-full h-auto max-h-[317px] object-fill bg-green-500 rounded-lg"
        />
      </div>
    );
  };

  return (
    <div className="flex justify-center my-8 w-full">
      <div className="w-full max-w-4xl">
        {" "}
        <ImageGallery
          items={images}
          autoPlay={true}
          showThumbnails={false}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={true}
          renderItem={renderCustomItem}
          showDescription={false}
          slideDuration={1000} // Duración de la animación de transición (milisegundos)
          autoPlayInterval={5000} // Intervalo entre transiciones (milisegundos)
          disableAutoPlayOnAction={true} // Desactiva auto-play cuando el usuario interactúa
        />
      </div>
    </div>
  );
};

export default ImageGalleryComponent;
