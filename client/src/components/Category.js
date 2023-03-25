import { Badge, Col, Row } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
// const Str = require('@supercharge/strings')

function Category({books , categoryName}) {
    const navigate = useNavigate()


    return (
       <Row
            gutter={[16, 16]}
            className='gap-4 pr-2 pl-2'
        >
            
            {books.map((book) => {
                
                    if (book.category === categoryName) {
                        
                        return <div className='card'
                        key={book.id}
                            onClick={() => navigate(`/book/${book._id}`)}
                        >
                            
                            <img src={book.image}/>
                            <div className='info'>
                                <h1>
                                {book.title}
                                </h1>
                                <p>{(book.description).substr(0,100)+"..."}</p>
                            </div>
                        </div>
                        // return <Col
                        //     xs={24}
                        //     sm={24}
                        //     md={24}
                        //     lg={6}
                        //     xl={6}
    
                        //     key={book.id}
                        //     onClick={() => navigate(`/book/${book._id}`)}
                        // >
                        //     <Badge.Ribbon
                        //         text={book.availableCopies > 0 ? "Available" : "Not Available"}
                        //         color={book.availableCopies > 0 ? "gree" : "red"}
    
                        //     >
    
    
                        //         <div className='rounded bg-white p-2 shadow flex flex-col gap-1'>
                        //             <img src={book.image} height="350px" />
                        //             <h1 className='text-md text-secondary uppercase font-bold mt-2'>
                        //                 {book.title}
                        //             </h1>
                        //         </div>
                        //     </Badge.Ribbon>
                        // </Col>
                    } else if(categoryName === "All") {
                        
                        return <div className='card'
                        key={book.id}
                            onClick={() => navigate(`/book/${book._id}`)}
                        >
                            
                            <img src={book.image}/>
                            <div className='info'>
                                <h1>
                                {book.title}
                                </h1>
                                <p>{(book.description).substr(0,100)+"..."}</p>
                            </div>
                        </div>
                    //     return <Col
                    //     xs={24}
                    //     sm={24}
                    //     md={24}
                    //     lg={6}
                    //     xl={6}
    
                    //     key={book.id}
                    //     onClick={() => navigate(`/book/${book._id}`)}
                    // >
                    //     <Badge.Ribbon
                    //         text={book.availableCopies > 0 ? "Available" : "Not Available"}
                    //         color={book.availableCopies > 0 ? "gree" : "red"}
    
                    //     >
    
    
                    //         <div className='rounded bg-white p-2 shadow flex flex-col gap-1'>
                    //             <img src={book.image} height="350px" />
                    //             <h1 className='text-md text-secondary uppercase font-bold mt-2'>
                    //                 {book.title}
                    //             </h1>
                    //         </div>
                    //     </Badge.Ribbon>
                    // </Col>
                    }else{
                        return " " 
                    }
                
                

            })}
        </Row>
    )
}

export default Category