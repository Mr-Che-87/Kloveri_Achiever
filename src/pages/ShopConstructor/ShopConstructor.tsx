import styles from "./ShopConstructor.module.scss";
import mockShopConstructorContent from "@/assets/mock-shop-constructor-content.png"


export default function ShopConstructor() {

    return (      
    <div>
        <h1>Конструктор товаров и магазин</h1>
        <img src={mockShopConstructorContent} />

    </div>
    )
}