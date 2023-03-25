import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteBook, GetAllBooks } from '../../../apicalls/book';
import Button from '../../../components/Button';
import { HideLoading, showLoading } from '../../../redux/loaderSlice';

import {message, Table} from 'antd'
import moment from 'moment'
import { GetAllUsers } from '../../../apicalls/user';
import IssuedBooks from './IssuedBooks';

function Users({role}) {
    const [selectedUser , setSelectedUser] = useState(null)
    const [showIssuedBooks,setShowIssuedBooks] = useState(false)
    const [users,setUsers] = React.useState([])
    const dispatch = useDispatch();

    const getUsers = async () =>{
      try{
        dispatch(showLoading());
        const response = await GetAllUsers(role);
        dispatch(HideLoading());
        if(response.success){
            setUsers(response.data);
        }else{
            message.error(response.message)
        }
    }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
    }
    }



    useEffect(() =>{
      getUsers();
    },[])

    const columns = [
      {
        title:"Id",
        dataIndex:"_id",
      },
      {
        title:"Name",
        dataIndex:"name",
      },
      {
        title:"Email",
        dataIndex:"email",
      },
      {
        title:"Phone",
        dataIndex:"phone",
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
            <Button title="Books" variant='contained' 
            onClick={
              ()=>{
                setSelectedUser(record);
                setShowIssuedBooks(true);
              }
            }
            ></Button>
          </div>
        )
      },
    ]

  return (
    <div>
        
        <Table columns={columns} dataSource={users} className='mt-2'/>

        {showIssuedBooks && 
            <IssuedBooks 
            showIssuedBooks={showIssuedBooks}
            setShowIssuedBooks={setShowIssuedBooks}
            selectedUser={selectedUser}
            />
        }


    </div>
  );
}

export default Users