import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteBook, GetAllBooks } from '../../../apicalls/book';
import Button from '../../../components/Button';
import { HideLoading, showLoading } from '../../../redux/loaderSlice';
import BookForm from './BookForm'
import {message, Table} from 'antd'
import moment from 'moment'
import Issues from './Issues';
import IssueForm from './IssueForm';

function Books() {
    const [formType,setFormType] = useState('add')
    const [selectedBook , setSelectedBook] = useState(null)
    const [ openBookForm,setOpenBookForm] = React.useState(false);
    const [ openIssueForm,setOpenIssueForm] = React.useState(false);
    const [ openIssue,setOpenIssue] = React.useState(false);
    const [books,setBooks] = React.useState([])
    const dispatch = useDispatch();

    const getBooks = async () =>{
      try{
        dispatch(showLoading());
        const response = await GetAllBooks();
        dispatch(HideLoading());
        if(response.success){
            setBooks(response.data);
        }else{
            message.error(response.message)
        }
    }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
    }
    }

    const delBooks = async (id) =>{
      try{
        dispatch(showLoading());
        const response = await deleteBook(id);
        dispatch(HideLoading());
        if(response.success){
          message.success(response.message)
          getBooks();
        }else{
            message.error(response.message)
        }
    }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
    }
    }

    useEffect(() =>{
      getBooks();
    },[])

    const columns = [
      {
        title:"Book",
        dataIndex:"image",
        render:(image) => <img src={image} alt="book" width="60" heigth="60"/>

      },
      {
        title:"Title",
        dataIndex:"title",
      },
      {
        title:"Category",
        dataIndex:"category",
      },
      {
        title:"Author",
        dataIndex:"author",
      },
      {
        title:"Publisher",
        dataIndex:"publisher",
      },
      {
        title:"Total Copies",
        dataIndex:"totalCopies",
      },
      {
        title:"Available Copies",
        dataIndex:"availableCopies",
      },
      {
        title:"Added On",
        dataIndex : "createdAt",
        render: (date) => moment(date).format("DD-MM-YYYY hh:mm:ss A"),
      },
      {
        title:"Actions",
        dataIndex:"action",
        render :(text,record)=>(
          <div className='flex gap-2'>
            <i class="ri-file-edit-line" 
            onClick={()=>{
              setFormType('edit');
              setSelectedBook(record);
              setOpenBookForm(true);
            }}
            ></i>
            <i class="ri-delete-bin-5-line"
            onClick={()=> delBooks(record._id)}
            ></i>

            <span className='' 
            onClick={() => {
            setOpenIssue(true);
            setSelectedBook(record);
            }}
            >Issues</span>

            <span className='' 
            onClick={() => {
            setOpenIssueForm(true);
            setSelectedBook(record);
            }}
            >Issues Book</span>

          </div>
        )
      },
    ]

  return (
    <div>
        <div className='flex justify-end'>
          <Button title="Add Book" onClick={() => {
            setFormType("add");
            setSelectedBook(null);
            setOpenBookForm(true)}}/>  
        </div>
        
        <Table columns={columns} dataSource={books} className='mt-2'/>

        
        
        {openBookForm && 
            <BookForm open={openBookForm} 
            setOpen={setOpenBookForm} 
            reloadBooks={getBooks}
            formType = {formType}
            selectedBook = {selectedBook}
            setSelectedBook={setSelectedBook}
            />
        }

        {openIssueForm && 
            <IssueForm open={openIssueForm} 
            setOpen={setOpenIssueForm}
            formType = {formType}
            selectedBook = {selectedBook}
            setSelectedBook={setSelectedBook}
            getData = {getBooks}
            />
        }

        {openIssue && 
            <Issues 
            open={openIssue} 
            setOpen={setOpenIssue}
            selectedBook = {selectedBook}
            setSelectedBook={setSelectedBook}
            reloadBooks = {getBooks}
            />
        }

    </div>
  );
}

export default Books