import React, { useEffect } from 'react'
import { Col, Modal, Row } from "antd"
import { Form, message } from "antd"
import Button from '../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { addBook, editBook } from '../../../apicalls/book';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, showLoading } from '../../../redux/loaderSlice';
import moment from 'moment';
import { GetUserById } from '../../../apicalls/user';
import { EditIssue, issueBook } from '../../../apicalls/issue';

function IssueForm({ open = false, setOpen , selectedBook , setSelectedBook , getData , selectedIssue , type}) {
      const { user } = useSelector((state) => state.users)
      const [patronId,setPatronId] = React.useState(type === "edit" ? selectedIssue.user._id : "");
      const [returnDate,setreturnDate] = React.useState(type === "edit" ? selectedIssue.returnDate.toString().split("T")[0] : "");
      const [validated,setValidated] = React.useState(false);
      const [errorMessage,seterrorMessage] = React.useState("");
      const [patronData,setpatronData] = React.useState(null);
      const dispatch = useDispatch()

      const validate = async()=>{
        try {
          dispatch(showLoading());
          const response = await GetUserById(patronId)
          if(response.success){
            if(response.data.role != "patron"){
              setValidated(false)
              seterrorMessage("This user is not a patron")
              dispatch(HideLoading());
              return
            }else{
              setpatronData(response.data)
              setValidated(true)
              seterrorMessage("")
            }
           
          }else{
            dispatch(HideLoading());
            setValidated(false)
            seterrorMessage(response.message)
          }
          dispatch(HideLoading());
        } catch (error) {
          dispatch(HideLoading());
          setValidated(false)
          seterrorMessage(error.message)
        }
      }

      const onIssue = async() => {
        try {
          dispatch(showLoading());
          let response = null;
          if(type !== "edit"){
            response = await issueBook({
              book : selectedBook._id,
              user : patronData._id,
              issueDate : new Date(),
              returnDate,
              rent:
                moment(returnDate).diff(moment(),"days") * selectedBook?.rentPerDay,
              fine:0,
              issuedBy : user._id,
            })
          }else{
            response = await EditIssue({
              book : selectedBook._id,
              user : patronData._id,
              issueDate : selectedIssue.issueDate,
              returnDate,
              rent:
                moment(returnDate).diff(moment(),"days") * selectedBook?.rentPerDay,
              fine:0,
              issuedBy : user._id,
              _id : selectedIssue._id,
            })
          }
           
          dispatch(HideLoading());
          if(response.success){
            message.success(response.message)
            getData()
            setPatronId("")
            setreturnDate("")
            setValidated(false)
            seterrorMessage("")
            setSelectedBook(null)
            setOpen(false)
          }else{
            message.error(response.message)
          }
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message)
        }
      }

      useEffect(() => {
        if (type === "edit"){
          validate();
        }
      },[open])
  return (
    <Modal
      title= ""
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}
    >

     <div className='flex flex-col gap-2'>
      <h1 className='text-secondary font-bold text-xl uppercase'>
        {type === "edit" ? "Edit / Renew Issue" : "Issue Book"}
      </h1>
      <div>
        <span>
          Patron Id : {" "}
        </span>
      </div>
      <input type="text" value={patronId}
      onChange={(e)=> setPatronId(e.target.value)}
      placeholder="Patron Id"
      disabled={type === "edit"}
      />
      <div>
        <span>Return Date : </span>
      </div>
      <input type="date" value={returnDate}
      onChange={(e)=> setreturnDate(e.target.value)}
      placeholder="Return Date"
      min={moment().format("YYYY-MM-DD")}
      />

      {errorMessage && <span className='error-message'>{errorMessage}</span>}

    {validated && (
      <div>
        <h1  className='text-sm'>Patron : {patronData.name}</h1>
        <h1>
          Number Of Days : {moment(returnDate).diff(moment(),"days")}
        </h1>
        <h1>
          Rent per Day : {selectedBook.rentPerDay}
        </h1>
        <h1>
          Rent : {" "}
          {moment(returnDate).diff(moment(),"days") * selectedBook.rentPerDay}
        </h1>
      </div>
    )}
    
    <div className='flex justify-end gap-2 w-100'>
      <Button title="Cancel" 
      variant='outlined'
      onClick={() => setOpen(false)}
      />
      
      {type !== "edit" && (<Button title="Validate" 
      disabled={patronId === "" || returnDate === ""}
      onClick={validate}
      />)}


      {validated && (<Button title= {type === "edit" ? "Edit" : "Issue"}
      disabled={patronId === "" || returnDate === ""}
      onClick={onIssue}
      />)}
    </div>


      </div> 


    </Modal>
  )
}

export default IssueForm;