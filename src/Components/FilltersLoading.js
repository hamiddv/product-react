
export function FilltersLoading(){
    return(
        <ul className={"m-0"}>
            <div className="text-secondary spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </ul>
    );
}