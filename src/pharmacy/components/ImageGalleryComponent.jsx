import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGalleryComponent = () => {
  const images = [
    {
      original: "/images/banner.png",
      thumbnail: "/images/banner.png",
    },
    {
      original: "/images/baby.png",
      thumbnail: "/images/baby.png",
    },
    {
      original: "/images/dermo.png",
      thumbnail: "/images/dermo.png",
    },
  ];

  // Función personalizada para renderizar las imágenes
  const renderCustomItem = (item) => {
    return (
      <div className="image-container">
        <img
          src={item.original}
          alt="Gallery"
          className="w-full h-96 object-cover"
        />
      </div>
    );
  };

  return (
    <div className="flex justify-center my-8">
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
