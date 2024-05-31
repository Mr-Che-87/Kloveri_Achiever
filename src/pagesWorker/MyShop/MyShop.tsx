import styles from "./MyShop.module.scss";
import mockMyShopContent from "@/assets/mock-MyShop-content.png"


export default function MyShop() {

    return (      
    <div>
        <h1>Мой магазин(каталог по категориям с ценами + то что уже заказал/получил)</h1>
        <p>ДЕМО_СКРИН</p>
        <img src={mockMyShopContent} />
    </div> 
    )
}