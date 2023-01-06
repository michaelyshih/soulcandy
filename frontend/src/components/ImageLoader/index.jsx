import { useState, useEffect } from "react";
export default function ImageLoader ({ placeholderSrc, src, ...props }) {

    const [imgSrc, setImgSrc] = useState("https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" || src);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImgSrc(src);
        }
    }, [src]);
    
    return (
      <img
        {...{ src: imgSrc, ...props }}
        alt={props.alt || ""}
        className={props.className || "place-holder-image"}
      />
    );
  };
