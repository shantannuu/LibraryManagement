import { message, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetAllBooks, searchBook } from '../../apicalls/book';
import { HideLoading, showLoading } from '../../redux/loaderSlice';
import Category from '../../components/Category'


function Home() {
  const [books, setBooks] = React.useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      dispatch(showLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      console.log(response.data)
      if (response.success) {
        setBooks(response.data);
      } else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  const searchHandler = async (event) => {
    try {
      dispatch(showLoading());
      if (event) {
        const response = await searchBook(event);
        dispatch(HideLoading());
        if (response.success) {
          setBooks(response.data)
        } else {
          message.error(response.message)
        }
      } else {
        getBooks();
        dispatch(showLoading());
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
    <div>
      <div className='section'>
        <div className='main'>
          <div className='main_tag'>
            <h1>WELCOME TO<br /><span>BOOK STORE</span></h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <a href="#" className='main_btn'>Go To Book</a>
          </div>
          <div className='main_img'>
            <img src="https://res.cloudinary.com/dyhf9rqfz/image/upload/v1679210486/table_icg7hz.png" />
          </div>
        </div>

      </div>
      <div className='flex items-center gap-1 mb-2 mt-1 pr-2 pl-2'>
        <i className="ri-search-line"></i>

        <input className='rounded w-100' type="text" onChange={(e) => searchHandler(e.target.value)} />
      </div>
    


      <div>
        <Tabs defaultActiveKey='1' className='pr-2 pl-2'>

          <TabPane tab="HOME" key="1">
            <Category books={books} categoryName="All" />
          </TabPane>

          <TabPane tab="FICTION" key="2">
            <Category books={books} categoryName="fiction" />
          </TabPane>


          <TabPane tab="HISTORY" key="3">
            <Category books={books} categoryName="history" />
          </TabPane>

          <TabPane tab="MYTHOLOGY" key="4">
            <Category books={books} categoryName="mythology" />
          </TabPane>

          <TabPane tab="BIOGRAPHY" key="5">
            <Category books={books} categoryName="biography" />
          </TabPane>

          <TabPane tab="POETRY" key="6">
            <Category books={books} categoryName="poetry" />
          </TabPane>

          <TabPane tab="DRAMA" key="7">
            <Category books={books} categoryName="drama" />
          </TabPane>
        </Tabs>
      </div>


      <div class="services">

        <div class="services_box">

          <div class="services_card">
            <i class="fa-solid fa-truck-fast"></i>
            <h3>Fast Issued</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div class="services_card">
            <i class="fa-solid fa-headset"></i>
            <h3>24 x 7 Services</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div class="services_card">
            <i class="fa-solid fa-tag"></i>
            <h3>Best Deal</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div class="services_card">
            <i class="fa-solid fa-lock"></i>
            <h3>Secure User Details</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
          </div>

        </div>

      </div>






      <div class="about">

        <div class="about_image">
          <img src='https://res.cloudinary.com/dyhf9rqfz/image/upload/v1679211051/about_vp3jdc.png' />
        </div>
        <div class="about_tag">
          <h1>About Us</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae cumque atque dolor corporis
            architecto. Voluptate expedita molestias maxime officia natus consectetur dolor quisquam illo?
            Quis illum nostrum perspiciatis laboriosam perferendis? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Minus ad eius saepe architecto aperiam laboriosam voluptas nobis voluptates
            id amet eos repellat corrupti harum consectetur, dolorum dolore blanditiis quam quo.
          </p>
          <a href="#" class="about_btn">Learn More</a>
        </div>

      </div>

    </div>
  )
}

export default Home