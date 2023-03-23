export const Reviews = ({book}) => {

    const currentDate = Date().split(' ')
    const month = currentDate[1]
    const date = currentDate[2]
    const year = currentDate[3]
    const hour = currentDate[4]

    return (
        <article className="flex-container d-flex mb-3">
            <img
                src={book.image}
                alt="default"
                className="commentorImg"
            />

            <div className="author-post">
                <div className="comment-meta d-flex">
                    <h4>{Object.keys(book)[0]}</h4>
                    <span className="meta-date">{date} {month} {year}, {hour}</span>
                    <small className="comments-reply">
                        <a href="#">
                            <i className="icon icon-mail-reply" />
                            Reply
                        </a>
                    </small>
                </div>
                {/*meta-tags*/}
                <p>
                    {Object.values(book)[0]}
                </p>
            </div>
        </article>
    )
}