export const MostLiked = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Trade</th>
                </tr>
            </thead>
            <tfoot>
                <tr></tr>
            </tfoot>
            <tbody>
                <tr>
                    <td data-title="Provider Name"></td>
                    <td data-title="Provider Name">
                        <a href="">
                            <i className="fa fa-heart-o" aria-hidden="true" />
                        </a>
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
            </tbody>
        </table>

    )
}