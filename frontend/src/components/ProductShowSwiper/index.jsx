import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import "./ProductShowSwiper.scss"

export default function ProductShowSwiper({ images, colorKeys}){

    const isSingle = () =>{
        if (colorKeys.length === 1) return false ;
        return true;
    }

    return (
        <>
        <Swiper
        pagination={true}
        navigation={true}
        loop={isSingle()}
        autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper">
            {colorKeys.map(colorKey=>{
                    return (
                        <SwiperSlide>
                            <img
                            src={`${images[colorKey]}`}
                            alt="" />
                        </SwiperSlide>)

            })}
        </Swiper>
        </>
    )
}
