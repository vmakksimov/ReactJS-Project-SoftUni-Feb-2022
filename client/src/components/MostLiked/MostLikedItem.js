export const MostLikedItem = ({book, index}) => {
    return (
        <tr>
           
            <td data-title="Provider Name"> {index}</td>
            
            <td data-title="Provider Name">
                <a href="">
                    <i className="fa fa-heart" aria-hidden="true" />
                </a>
                {book.title}
            </td>
            <td data-title="E-mail"></td>
            <td className="select">
                <a className="button" href="">
                    Buy
                </a>
                <a className="button" href="">
                    Buy
                </a>
            </td>
        </tr>
    )
}