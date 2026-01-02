import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";

const ImgSlider = (props) => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false // hide arrows on mobile
            }
          }
        ]

    };

    return (
        <Carousel {...settings}>
            <Wrap>
                <a>
                    <img src="/images/slider-badag.jpg" alt="Slider Image 1" />
                </a>
            </Wrap>
            <Wrap>
                <a>
                    <img src="/images/slider-badging.jpg" alt="Slider Image 2" />
                </a>
            </Wrap>
            <Wrap>
                <a>
                    <img src="/images/slider-scale.jpg" alt="Slider Image 3" />
                </a>
            </Wrap>
            <Wrap>
                <a>
                    <img src="/images/slider-scales.jpg" alt="Slider Image 4" />
                </a>
            </Wrap>
        </Carousel>
    )
}

const Carousel = styled(Slider)`
    margin-top: 20px;
    
    & > button {
        opacity: 0;
        height: 100%;
        width: 5vw;
        z-index: 1;
        &:hover {
            opacity: 1;
            transition: opacity 0.2s ease 0s;
        }
    }

    ul.slick-dots li button:before {
        font-size: 10px;
        color: rgb(150, 158, 171);
    }

    ul.slick-dots li.slick-active button:before {
        color: #fff;
    }

    .slick-list {
        overflow: initial;
    }

    .slick-prev {
        left: -60px;
    }

    .slick-next {
        right: -60px;
    }
        
`
const Wrap = styled.div`
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    a {
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
                    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        display: block;
        position: relative;
        padding: 4px;

        img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }

        &:hover {
            padding: 0;
            border: 4px solid rgba(249, 249, 249, 0.8);
            transition-duration: 300ms;
        }
    }
`

export default ImgSlider;