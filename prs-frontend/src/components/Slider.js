import SimpleImageSlider from "react-simple-image-slider";
import Slide1 from '../assets/img/slide1.jpeg'
import Slide2 from '../assets/img/slide2.jpeg'
import Slide3 from '../assets/img/slide3.jpeg'

const images = [
    { url: Slide1 },
    { url: Slide2 },
    { url: Slide3 },
  ];
  const Slider = () => {
    return (
      <div>
        <SimpleImageSlider
          width={"100%"}
          height={504}
          images={images}
          showBullets={true}
          showNavs={true}
          style={{objectFit:"content"}}
        />
      </div>
    );
  }

  export default Slider;