//getting fill star icon
import {BsStarFill} from "react-icons/bs"
//getting half fill star icon
import {BsStarHalf} from "react-icons/bs"
//getting empty star icon
import {BsStar} from "react-icons/bs"

let score = null

export function StarList(props) {
    //set product score in score var
    score = props.starScore

    function setStar(number) {
        score -= number
        if (score >= 2) {
            return <BsStarFill style={{color: "rgb(255, 185, 0)"}}/>
        } else if (score === 1) {
            return <BsStarHalf style={{color: "rgb(255, 185, 0)"}}/>
        } else {
            return <BsStar style={{color: "rgb(255, 185, 0)"}}/>
        }
    }

    return (
        <>
            {setStar(0)}
            {setStar(2)}
            {setStar(2)}
            {setStar(2)}
            {setStar(2)}
        </>
    )
}