import { Col, message, Row } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom"
import { getBookById } from '../../apicalls/book';
import { HideLoading, showLoading } from '../../redux/loaderSlice';
import moment from 'moment';
function BookDescription() {
    const [bookData, setBookData] = React.useState(null)
    const dispatch = useDispatch();
    const { id } = useParams();

    const getBooks = async () => {
        try {
            dispatch(showLoading());
            const response = await getBookById(id);
            dispatch(HideLoading());
            if (response.success) {
                setBookData(response.data);
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getBooks();
    }, [])



    return (
        
        bookData &&
        <div className='card-wrapper'>
            <div className='book-card'>
                <div className='product-imgs'>
                    <div className='img-display'>
                        <div className='img-showcase'>
                            <img src={bookData?.image}/>
                        </div>
                    </div>
                    
                </div>
                <div className='product-content'>
                    <h2 className='product-title'>
                    {bookData?.title}
                    </h2>
                    <h1>By {bookData?.author}</h1>
                    <div className='product-details'>
                        <h2>about this Book : </h2>
                        <p>{bookData?.description}</p>
                        <ul>
                            <li>Publisher : <span>{bookData?.publisher}</span></li>
                            <li>Category : <span>{bookData?.category}</span></li>
                            <li>Available Copies : <span>{bookData?.availableCopies}</span></li>
                            <li>Published Date : <span>{moment(bookData?.publishedDate).format("MMM Do YYYY")}</span></li>
                            <li>Rent : <span>{bookData?.rentPerDay} Rs per day</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        // <div>
        //    <Row 
        //    gutter={[16,16]}
        //    align="middle"
        //    justify='center'
        //    >
        //     <Col  xs={24}
        //         sm={24}
        //       md={12}
        //       lg={12}
        //       xl={12}
        //       className="flex flex-col gap-2">
        //     <h1 className='text-2xl text-secondary uppercase font-bold mt-2'>
        //     {bookData?.title}
        //     </h1>
        //     <div className='flex justify-center'>
        //     <img src={bookData?.image} alt=""
        //     height={400}
        //     width={350}/>
        //     </div>
        //     <p>{bookData?.description}</p>

        //     <div className='flex justify-between'>
        //         <h1 className='text-md'>Author</h1>
        //         <h1 className='text-md'>{bookData?.author}</h1>
        //     </div>
        //     <div className='flex justify-between'>
        //         <h1 className='text-md'>Publisher</h1>
        //         <h1 className='text-md'>{bookData?.publisher}</h1>
        //     </div>
        //     <div className='flex justify-between'>
        //         <h1 className='text-md'>Published Date</h1>
        //         <h1 className='text-md'>{moment(bookData?.publishedDate).format("MMM Do YYYY")}</h1>
        //     </div>
        //     <div className='flex justify-between'>
        //         <h1 className='text-md'>Available Copies</h1>
        //         <h1 className='text-md'>{bookData?.availableCopies}</h1>
        //     </div>
        //     </Col>
        //    </Row>
        // </div>
        
        
    )
}

export default BookDescription