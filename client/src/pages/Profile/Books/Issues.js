import React, { useEffect } from 'react'
import { Col, Modal, Row, Table } from "antd"
import { Form, message } from "antd"
import Button from '../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { addBook, editBook } from '../../../apicalls/book';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, showLoading } from '../../../redux/loaderSlice';
import { DeleteIssues, GetIssues, ReturnBook } from '../../../apicalls/issue';
import moment from 'moment';
import IssueForm from "./IssueForm"

function Issues({ open = false, setOpen , selectedBook , reloadBooks}) {
  const [issues,setIssues] = React.useState([]);
  const [selectedIssue,setSelectedIssue] = React.useState(null);
  const [showIssueForm,setshowIssueForm] = React.useState(false);
  const dispatch = useDispatch()

  const getIssues = async () =>{
    try{
      dispatch(showLoading());
      const response = await GetIssues({
        book : selectedBook._id
      });
      dispatch(HideLoading());
      // console.log(response.data[0].returnDate)
      if(response.success){
          setIssues(response.data);
      }else{
          message.error(response.message)
      }
  }catch(error){
      dispatch(HideLoading());
      message.error(error.message);
  }
  }

  const returnHandler = async (issue) => {
    try{
      const today = moment().format("YYYY-MM-DD");
      const dueDate = moment(issue.returnDate).format("YYYY-MM-DD")
      if(today > dueDate){
        const fine = moment(today).diff(dueDate,"days") * 1
        issue.fine = fine;
        
      }
      issue.returnedDate = new Date();
      issue.book = issue.book._id;
      issue.status = "Returned"
      dispatch(showLoading());
      const response = await ReturnBook(issue);
      dispatch(HideLoading());
      if(response.success){
          message.success(response.message)
          reloadBooks();
          getIssues();
      }else{
          message.error(response.message)
      }
  }catch(error){
      dispatch(HideLoading());
      message.error(error.message);
  }
  }
  
  const deleteHandler = async (issue) => {
    try{
      dispatch(showLoading());
      const response = await DeleteIssues({
        ...issue,
        book : issue.book._id
      });
      dispatch(HideLoading());
      if(response.success){
          message.success(response.message)
          getIssues();
          reloadBooks();
      }else{
          message.error(response.message)
      }
  }catch(error){
      dispatch(HideLoading());
      message.error(error.message);
  }
  
  }


  useEffect(() =>{
    getIssues();
  },[])

  const columns = [
    {
      title:"Id",
      dataIndex:"_id",
    },
    {
      title:"Patron / User",
      dataIndex:"user",
      render : (user) => user.name,
    },
    {
      title:"Issued On",
      dataIndex:"issueDate",
      render: (issueDate) => moment(issueDate).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title:"Due Date",
      dataIndex : "returnDate",
      render: (returnDate) => returnDate.toString().split("T")[0],
    },
    {
      title:"Rent",
      dataIndex : "rent",
      
    },
    {
      title:"Fine",
      dataIndex : "fine",
      
    },
    {
      title:"Returned On",
      dataIndex : "returnedDate",
      render : (returnedDate) => {
        if(returnedDate){
          return moment(returnedDate).format("DD-MM-YYYY hh:mm:ss A")
        }else{
          return "Not Returned Yet"
        }
      }
    },
    {
      title:"Actions",
      dataIndex:"action",
      render :(text,record)=>(
        <div className='flex gap-1'>
          { record.status === "issued" && (<Button 
          title="Renew"
           variant='outlined' 
           onClick={() => {setSelectedIssue(record);
            setshowIssueForm(true);
           }}></Button>)}
          { record.status === "issued" && (<Button 
          title="Return"
           variant='outlined' 
           onClick={() => returnHandler(record)
           }></Button>)}
           { record.status === "Returned" && (<Button 
          title="Delete"
           variant='outlined' 
           onClick={() => deleteHandler(record)
           }></Button>)}
           
        </div>
      )
    },
  ]


  return (
    
    <Modal
      title= ""
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={1400}
      footer={null}
    >
      <h1 className='text-xl mt-1 mb-1 text-secondary uppercase font-bold text-center'>
        Issues of {selectedBook.title}
      </h1>
      <Table columns={columns} dataSource={issues}/>

      {showIssueForm && (<IssueForm 
      selectedBook={selectedBook}
      selectedIssue={selectedIssue}
      open={showIssueForm}
      setOpen={setshowIssueForm}
      setSelectedBook={()=>{}}
      getData={()=>{
        getIssues();
        reloadBooks();
      }}
      type="edit"
      />)}
    </Modal>
  )
}

export default Issues;