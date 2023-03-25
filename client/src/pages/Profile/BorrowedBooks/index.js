import { Button, message, Modal, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetIssues } from '../../../apicalls/issue'
import { HideLoading, showLoading } from '../../../redux/loaderSlice'

function IssuedBooks() {
  const { user } = useSelector((state)=>state.users)
  const [IssuedBooks, setIssuedBooks] = useState([])
  const dispatch = useDispatch()

  const getIssues = async () => {
    try {
      dispatch(showLoading());
      const response = await GetIssues({
        user: user._id
      });
      dispatch(HideLoading());
      if (response.success) {
        setIssuedBooks(response.data);
      } else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getIssues();
  }, [])

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Book",
      dataIndex: "book",
      render: (book) => book.title,
    },
    {
      title: "Issued On",
      dataIndex: "issueDate",
      render: (issueDate) => moment(issueDate).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Due Date",
      dataIndex: "returnDate",
      render: (returnDate) => moment(returnDate).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Rent",
      dataIndex: "rent",

    },
    {
      title: "Fine",
      dataIndex: "fine",

    },
    {
      title: "Returned On",
      dataIndex: "returnedDate",
      render: (returnedDate) => {
        if (returnedDate) {
          return moment(returnedDate).format("DD-MM-YYYY hh:mm:ss A")
        } else {
          return "Not Returned Yet"
        }
      }
    },

  ]

  return (

    <Table columns={columns} dataSource={IssuedBooks} />

  )
}

export default IssuedBooks