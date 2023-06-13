//this variable defines that we muse set input or not
let isValid = null

export function EmailConfigurationInput(props) {
    const {setKeyFunc} = props
    const {inputName} = props

    function validation(event) {
        // checking if pressed key was not valid then we set isValid false then it won't set next or prev input of focus
        if ((isNaN(event.key) || event.key === ' ') && event.key !== 'Backspace') {
            event.preventDefault()
            isValid = false
            //checking if pressed key was backspace
            //it defines that we must set prev input on focus
        } else if (event.key === 'Backspace') {
            isValid = true
            //checking if pressed key was not none of them it's a number
            //it defines that we must set next input on focus
        } else {
            isValid = true
        }
    }

    //set next input on focus
    function setFocus(event, number) {
        if (isValid) {
            //event target parent element childrens
            let parentChildren = Array.from(event.target.parentElement.parentElement.children)
            parentChildren.forEach(async (child, index) => {
                //checking which input is the same input as event target
                if (event.target.name === child.firstChild.name) {
                    //checking what is the number if it was 1 it means we must set next input focus
                    //checking the next input is defined
                    if (number === 1 && index !== parentChildren.length - 1) {
                        parentChildren[index + number].firstChild.focus()
                        //checking what is the number if it was -1 it means we must set prev input focus
                        //checking the prev input is defined
                    } else if (number === -1 && index !== 0) {
                        parentChildren[index + number].firstChild.focus()
                        //checking if use is done typing
                        //sets input blur
                    } else if (number === 1 && index === parentChildren.length - 1) {
                        parentChildren[index].firstChild.blur()
                    }
                    setKeyFunc(event.target.value)
                }
            })
            //setting is valid null to set back to initial value
            isValid = null
        }
    }

    return (<div className={"col-md-2 col-4 mb-lg-0 mb-3"}>
        <input maxLength={1}
               className={"form-control fs-3 mb-2 text-center border-top-0 border-start-0 border-end-0 rounded-0  shadow-none"}
               type={"text"}
               name={inputName}
               autoComplete={'off'}
               onKeyUp={(event) => setFocus(event, event.key !== "Backspace" ? 1 : -1)}
               onKeyDown={(event) => validation(event)}
               style={{borderBottom: "1px solid #19bfd3"}}/>
    </div>)
}