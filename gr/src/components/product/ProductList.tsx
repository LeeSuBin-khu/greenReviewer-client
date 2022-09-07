import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

export interface IProducts {
  id: number;
  picThumbnail: string;
  name: string;
  vendor: string;
  price: number;
  eco: string;
}

export const DUMMY_LIST: IProducts[] = [
  {
    id: 1,
    picThumbnail:
      "https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2022/03/23/14/3/409ef56b-88a7-449d-a715-928780540644.jpg",
    name: "삼성전자 갤럭시 A53 자급제 SM-A536N",
    vendor: "samsung",
    price: 111111,
    eco: "친환경적",
  },
  {
    id: 2,
    picThumbnail:
      "https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2034532750655417-b52c4b34-b1c3-4f5d-939d-b926d49c786f.jpg",
    name: "Apple 아이폰 13 Pro 자급제",
    vendor: "apple",
    price: 22222,
    eco: "그린워싱 위험",
  },
  {
    id: 3,
    picThumbnail:
      "https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2020/12/14/15/5/155540f4-1b4e-4db1-a066-9babdf7d26e1.jpg",
    name: "구글 네스트 오디오 인공지능 AI 블루투스 스피커",
    vendor: "google",
    price: 33333,
    eco: "자료부족",
  },
  {
    id: 4,
    picThumbnail:
      "https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2022/08/01/14/1/bb853965-b12e-47cc-b481-8e6b38aad428.jpg",
    name: "LG 코드제로 A9S 오브제컬렉션 올인원타워 스틱청소기 방문설치",
    vendor: "LG",
    price: 44444,
    eco: "매우 친환경적",
  },
];

const ProductList: React.FC = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProductList = async () => {
      await axios
        .get("/product/list", {
          params: {
            q: "종이컵",
            page: 1,
            size: 10,
          },
        })
        .then((res) => {
          console.log(res.data);
          setProductList(res.data);
        })
        .catch((err) => console.log(err));
    };
    getProductList();
  }, []);

  return (
    <div className="">
      <div className="product flex-row content-center">
        {productList.map((list: IProducts) => (
          <ProductCard
            id={list.id}
            name={list.name}
            vendor={list.vendor}
            price={list.price}
            picThumbnail={list.picThumbnail}
            eco={list.eco}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
