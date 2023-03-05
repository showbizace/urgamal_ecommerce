import Image from "next/image";
import React from "react";
import GlobalLayout from "../components/GlobalLayout/GlobalLayout";
import ProductTypeChip from "../components/ProductTypeChip/ProductTypeChip";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Magnifier from "../components/Magnifier/Magnifier";
import Head from "next/head";
import { BsSuitHeart,BsSuitHeartFill } from 'react-icons/bs';
import { AiOutlineShoppingCart} from 'react-icons/ai';

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
]; 

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://18.136.212.75:8080/product/?productid=${params.id}`);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      product: data.data,
    },
  };
}

const ProductDetail = ({product}) => {
  return (
    <GlobalLayout  title={product.Name}>
      
      <div className="px-32">
        <div className="flex gap-14 pt-12 justify-center">
          {/* <Image src="https://m.media-amazon.com/images/I/71MzNrCPYsL.jpg" width={50} height={50} /> */}
          {/* <Image src="/bundle-1.svg" width={315} height={380} /> */}
          <Magnifier imgSrc={'/bundle-1.svg'} imgWidth={515} imgHeight={515} magnifierRadius={50} />
          {/* <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                height: 380,
                width: 315,
                src: "https://picsum.photos/id/1019/1000/600/",
              },
              largeImage: {
                src: "https://picsum.photos/id/1019/1000/600/",
                width: 1200,
                height: 1800,
              },
              enlargedImagePosition: "over",
              enlargedImageContainerDimensions: {
                width: "100%",
                height: "100%",
              },
            }}
          /> */}
          {/* <Magnifier imgSrc="https://picsum.photos/id/1019/1000/600/" imgWidth={600} imgHeight={600} magnifierRadius={150} /> */}
          {/* <Carousel
            infiniteLoop={true}
            autoPlay
            interval={3000}
            showThumbs={true}
            showArrows={false}
            showStatus={true}
            showIndicators={false}
            swipeable={true}
            renderThumbs={() =>
              images.map((img, idx) => (
                <div key={idx} className="w-full h-20 relative">
                  <Image src={img.thumbnail} fill alt="logo"></Image>
                </div>
              ))
            }
          >
            {images.map((e) => (
              <div>
<<<<<<< HEAD
                {/* <Magnifier imgSrc={e.original} imgWidth={600} imgHeight={600} magnifierRadius={50} /> */}
                {/* <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: e.original,
                    },
                    largeImage: {
                      src: e.original,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImagePosition: "over",
                  }}
                /> */}
=======
                <Magnifier imgSrc={e.original} imgWidth={600} imgHeight={600} magnifierRadius={50} />
                
>>>>>>> 388c9875811b1c86f823f8686622626f2a3672a9
              </div>
            ))}
          </Carousel> */}
           
          <div className="flex flex-col gap-6">
            <div className=" text-lg font-semibold">{product.Name}</div>
            <div className="flex font-semibold gap-2">
              <span className="text-greenish-grey  ">Ширхэгийн үнэ:</span>
              <span className=" ">{
              Intl.NumberFormat('mn-MN').format(product.ListPrice)}₮</span>
            </div>
            <div className="flex font-semibold gap-2" >
              <span className="text-greenish-grey  ">Бөөний үнэ:</span>
              <span className="text-greenish-grey line-through "> 15’000₮</span>
              <span className="text-greenish-grey  "> / </span>
              <span> 15’000₮</span>
            </div>
            <div className="flex font-semibold  gap-2">
              <span className="text-greenish-grey  ">Үлдэгдэл:</span>
              <span> 150 Ш</span>
            </div>
            <div className="flex gap-2 font-semibold">
              <span className="text-greenish-grey  ">Төрөл:</span>
              {product.CategoryName && 
              <ProductTypeChip name={product.CategoryName} />
              }
              <ProductTypeChip name="Бордоо" />
            </div>
            <div className="flex flex-col gap-4">
            <span className="flex font-semibold text-greenish-grey">Хэрэглэх заавар</span>
              <textarea
                cols={60}
                rows={12}
                readOnly
                className=" overflow-x-hidden overflow-y-hidden focus: outline-0 py-3 px-3 rounded-md"
                value="Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар,Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх
                заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар , Хэрэглэх заавар, Хэрэглэх заавар, Хэрэглэх заавар,
                Хэрэглэх заавар, Хэрэглэх"
              ></textarea>
            </div>

            <div className="flex gap-6 w-full mt-5"> 
                <button className=" border-tertiary border-2 text-tertiary flex-grow flex justify-between items-center px-5 py-3 rounded-md">
                  <span className="font-semibold"> Хадгалах </span>
                  <BsSuitHeart className="font-semibold" size={20}/>
                </button> 
                <button className="  bg-button-yellow text-white flex-grow flex justify-between items-center px-5 py-3 rounded-md">
                  <span className="font-semibold"> Сагсанд хийх </span>
                  
                  <AiOutlineShoppingCart className="font-semibold"  size={20}/>
                </button> 
            </div>
          </div>
         
        </div>
        <hr className="my-10"/>

        <div>
          
        </div>
      </div>
    </GlobalLayout>
  );
}

export default ProductDetail;