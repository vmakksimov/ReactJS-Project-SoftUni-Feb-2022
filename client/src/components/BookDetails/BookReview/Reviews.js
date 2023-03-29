

export const Reviews = ({ book, user, day, dateHandler}) => {

   
    
    // const currentDate = Date().split(' ')

    // const currentDay = day.find(x => x['date'])
    

    // const month = currentDay.month
    // const date = currentDay.date
    // const year = currentDay.year
    // const hour = currentDay.hour

 

    // const hola = new Date()
    // const minutes = hola.setUTCMinutes()
   
    // console.log(minutes)

    const style = {}

    style.borderRadius = '62%'
    style.width = '4%'
    style.border = '4px solid #C5A992'
   
    

    return (


        <div className="comment-list mt-4">
            <article className="flex-container d-flex mb-3">

              
                {user.image ?
                       <img
                       src={user.image}
                       alt="default"
                       className="commentorImg"
                       style={style}
                   />
                   : ''
            }
                                {/* <img
                    src={user.image}
                    alt="default"
                    className="commentorImg"
                    style={style}
                /> */}

                <div className="author-post">
                    <div className="comment-meta d-flex">
                        <h4>{Object.keys(book)[0]}</h4>
                        <span className="meta-date"></span>
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
        </div>


    )
}