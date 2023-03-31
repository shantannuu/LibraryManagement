import {  message } from 'antd';
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
                            <img src={bookData?.image} />
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
    )
}

export default BookDescription