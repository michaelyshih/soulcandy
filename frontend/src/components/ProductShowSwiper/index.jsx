import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import "./ProductShowSwiper.scss"

export default function ProductShowSwiper({ images, colorKeys}){

    // const swiper = new Swiper('.swiper',{
    //     loop: true,
    //     module:
    //         [Navigation],
    //     navigation:
    //         {nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev'},
    //     pagination:
    //         {el:".swiper-pagination"},
    //     // scrollbar:
    //     //     {el:".swiper-scrollbar"}
    // })

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
                    console.log(colorKey)
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
