import "../index.css"
import {HeroSection} from "../Components/HeroSection";
import {FeaturedProductList} from "../Components/FeaturedProductList";
import {CustomFurniture} from "../Components/CustomFurniture";
import {NewsLetter} from "../Components/NewsLetter";

export function Home() {
    return (
        <>
            <HeroSection/>
            <FeaturedProductList/>
            <CustomFurniture/>
            <NewsLetter/>
        </>
    );
}