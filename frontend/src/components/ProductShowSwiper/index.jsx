import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import "./ProductShowSwiper.scss"

export default function ProductShowSwiper({parsedColor, images, colorKeys}){

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


    return (
        <>
        {/* {console.log(parsedColor)}
        {console.log(images)}
        {console.log(colorKeys)}
        <div class="swiper">

            <div class="swiper-wrapper">
                {colorKeys.map(colorKey=>{
                    console.log(colorKey)
                    return (
                        <div class="swiper-slide">
                            <img
                            src={`${images[colorKey]}`}
                            alt="" />
                        </div>)

                })}
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-scrollbar"></div>

        </div> */}
        <Swiper
        pagination={true}
        navigation={true}
        loop={true}
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
