import styles from "./ShopConstructor.module.scss";
import mockShopConstructorContent from "@/assets/mock-shop-constructor-content.png"


export default function ShopConstructor() {

    return (      
    <div>
        <h1>Конструктор товаров и магазин</h1>
        <p>-создание категорий</p>
        <p>-создание конкретных товаров+присвоение цены</p>
        <p>-обработка уведомлений о заказах работников</p>
        <p>ДЕМО_СКРИН</p>
        <img src={mockShopConstructorContent} />
    </div>
    )
}