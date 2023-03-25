import { Col, message, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { GetReports } from '../../../apicalls/report';
import { HideLoading, showLoading } from '../../../redux/loaderSlice';

function Reports() {
  const [reports, setReports] = React.useState(null)
  const dispatch = useDispatch();

  const getReports = async () => {
    try {
      dispatch(showLoading());
      const response = await GetReports();
      console.log(response.data)
      dispatch(HideLoading());
      if (response.success) {
        setReports(response.data);
      } else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getReports()
  }, [])




  return (
    <div>
      <h1 className='report-h1'>Books</h1>
      <Row gutter={[16, 16]}>
        {/* books */}
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.books?.BooksCount}</h1>
              <i class="ri-book-2-fill"></i>
            </div>
            <h2>Total Books</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.books?.availableBooksCopiesCount}</h1>
              <i class="ri-booklet-fill"></i>
            </div>
            <h2>Available Copies</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.books?.totalBooksCopiesCount}</h1>
              <i class="ri-layout-top-fill"></i>
            </div>
            <h2>Total Copies</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.books?.issuesBooksCopiesCount}</h1>
              <i class="ri-book-open-fill"></i>
            </div>
            <h2>Issued Copies</h2>
          </div>
        </Col>
      </Row>
      {/* users */}
      <h1 className='report-h1'>Users</h1>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.users?.usersCount}</h1>
              <i class="bi bi-people-fill"></i>
            </div>
            <h2>Total User</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.users?.patronCount}</h1>
              <i class="ri-contacts-book-2-fill"></i>
            </div>
            <h2>Patrons</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.users?.librariansCount}</h1>
              <i class="ri-folder-user-line"></i>
            </div>
            <h2>Librarians</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.users?.adminsCount}</h1>
              <i class="ri-shield-user-fill"></i>
            </div>
            <h2>Admins</h2>
          </div>
        </Col>
      </Row>
      {/* RENEVUE */}
      <h1 className='report-h1'>Revenue</h1>
      <Row gutter={[16, 16]}>
        
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1><i class="bi bi-currency-rupee"></i> {reports?.revenue?.rentCollected}</h1>
              <i class="bi bi-credit-card"></i>
            </div>
            <h2>Rent Collected</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1><i class="bi bi-currency-rupee"></i> {reports?.revenue?.fineCollected}</h1>
              <i class="bi bi-cash-coin"></i>
            </div>
            <h2>Fine Collected</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1><i class="bi bi-currency-rupee"></i> {reports?.revenue?.totalCollected}</h1>
              <i class="bi bi-wallet2"></i>
            </div>
            <h2>Total Collection</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1><i class="bi bi-currency-rupee"></i> {reports?.revenue?.rentPending}</h1>
              <div>
              <i class="bi bi-cash-coin"></i><i class="bi bi-exclamation-lg"></i>
              </div>
              
            </div>
            <h2>Rend Pending</h2>
          </div>
        </Col>
      </Row>
      
      {/* Issue */}
      <h1 className='report-h1'>Issues</h1>
      <Row gutter={[16, 16]}>
        
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.issues?.issuesCount}</h1>
              <i class="bi bi-ticket"></i>
            </div>
            <h2>Issues</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.issues?.returnedIssuesCount}</h1>
              <i class="ri-task-fill"></i>
            </div>
            <h2>Returned Issue</h2>
          </div>
        </Col>
        <Col span={6}>
          <div className='card-report shadow'>
            <div className='card-report-1 flex justify-between'>
              <h1>{reports?.issues?.pendingIssuesCount}</h1>
              <i class="ri-folder-info-fill"></i>
            </div>
            <h2>Pending Issues</h2>
          </div>
        </Col>
      </Row>

      

    
    </div >
  )
}

export default Reports