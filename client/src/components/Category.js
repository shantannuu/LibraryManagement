import { Badge, Col, Row } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Category({ books, categoryName }) {
    const navigate = useNavigate()


    return (
        <Row
            gutter={[16, 16]}
            className='gap-4 pr-2 pl-2'
        >

            {books.map((book) => {

                if (book.category === categoryName) {

                    return <Badge.Ribbon
                        text={book.availableCopies > 0 ? "Available" : "Not Available"}
                        color={book.availableCopies > 0 ? "gree" : "red"}

                    ><div className='card'
                        key={book.id}
                        onClick={() => navigate(`/book/${book._id}`)}
                    >

                            <img src={book.image} />
                            <div className='info'>
                                <h1>
                                    {book.title}
                                </h1>
                                <p>{(book.description).substr(0, 100) + "..."}</p>
                            </div>

                        </div>
                    </Badge.Ribbon>

                } else if (categoryName === "All") {

                    return <Badge.Ribbon
                        text={book.availableCopies > 0 ? "Available" : "Not Available"}
                        color={book.availableCopies > 0 ? "gree" : "red"}

                    ><div className='card'
                        key={book.id}
                        onClick={() => navigate(`/book/${book._id}`)}
                    >

                            <img src={book.image} />
                            <div className='info'>
                                <h1>
                                    {book.title}
                                </h1>
                                <p>{(book.description).substr(0, 100) + "..."}</p>
                            </div>
                        </div>
                    </Badge.Ribbon>
                } else {
                    return " "
                }



            })}
        </Row>
    )
}

export default Category