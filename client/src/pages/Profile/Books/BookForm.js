import React from 'react'
import { Col, Modal, Row } from "antd"
import { Form, message } from "antd"
import Button from '../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { addBook, editBook } from '../../../apicalls/book';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, showLoading } from '../../../redux/loaderSlice';

function BookForm({ open, setOpen , reloadBooks , formType , setFormType , selectedBook ,setSelectedBook}) {

  const {user} = useSelector(state => state.users);

  const dispatch = useDispatch()

  const onFinish = async (values) => {
    try{
      dispatch(showLoading());
      values.createdBy = user._id;
      
      let response = null;
        if(formType === "add"){
          values.availableCopies = values.totalCopies;
          response = await addBook(values);
        }else{
          values._id = selectedBook._id
          response = await editBook(values);
        } 
      dispatch(HideLoading());
      if(response.success){
          message.success(response.message);
          reloadBooks();
          setOpen(false);
      }else{
          dispatch(HideLoading());
          message.error(response.message)
      }
  }catch(error){
      message.error(error.message);
  }
  }

  return (
    <Modal
      title= {formType === "add" ? "Add Book" : "Edit Book"}
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}
    >

      <Form layout="vertical" onFinish={onFinish} 
      initialValues={{...selectedBook,
      publishedDate : selectedBook ?.publishedDate ? new Date(selectedBook?.publishedDate).toISOString().split('T')[0] : null
      }}
      >
        <Row
          gutter={[20, 20]}
        >
          <Col span={24}>
            <Form.Item label='Title' name='title'
              rules={[
                {
                  required: true,
                  message: "Please input your title",
                }
              ]}
            >
              <input type="text" placeholder='title' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label='Description' name='description'
              rules={[
                {
                  required: true,
                  message: "Please input your description",
                }
              ]}
            >
              <textarea type="text" placeholder='description' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label='Image URL' name='image'
              rules={[
                {
                  required: true,
                  message: "Please input your image",
                }
              ]}
            >
              <input type="text" placeholder='image' />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label='Author' name='author'
              rules={[
                {
                  required: true,
                  message: "Please input your author",
                }
              ]}
            >
              <input type="text" placeholder='author' />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label='Publisher' name='publisher'
              rules={[
                {
                  required: true,
                  message: "Please input your publisher",
                }
              ]}
            >
              <input type="text" placeholder='publisher' />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label='Published Date' name='publishedDate'
              rules={[
                {
                  required: true,
                  message: "Please input your published Date",
                }
              ]}
            >
              <input type="date" placeholder='Published Date' />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label='Category' name='category'
              rules={[
                {
                  required: true,
                  message: "Please input your category",
                }
              ]}
            >
              <select>
                <option value="">
                  select category
                </option>
                <option value="Mythology">
                  Mythology
                </option>
                <option value="Fiction">
                  Fiction
                </option>
                <option value="Non-Fiction">
                  Non-Fiction
                </option>
                <option value="Biography">
                  Biography
                </option>
                <option value="Poetry">
                  Poetry
                </option>
                <option value="drama">
                  drama
                </option>
                <option value="History">
                  History
                </option>
              </select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label='Rent Per Day' name='rentPerDay'
              rules={[
                {
                  required: true,
                  message: "Please input rent per day",
                }
              ]}
            >
              <input type="number" placeholder='Rent per day' />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label='Total Copies' name='totalCopies'
              rules={[
                {
                  required: true,
                  message: "Please input your total copies",
                }
              ]}
            >
              <input type="number" placeholder='total copies' />
            </Form.Item>
          </Col>

        </Row>

        <div className='flex justify-end gap-2 mt-1'>
          <Button title='Cancel' type='button' variant='outlined' onClick={()=> setOpen(false)}></Button>
          <Button title='Save' type="submit"></Button>
        </div>
      </Form>

    </Modal>
  )
}

export default BookForm;