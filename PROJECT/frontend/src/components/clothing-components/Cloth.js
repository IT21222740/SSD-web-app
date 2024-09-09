import React from 'react'
import {Card } from 'react-bootstrap';
import  "../Online-shopping-components/Home.css"
import 'bootstrap/dist/css/bootstrap.min.css'

function Cloth({cloth_item}) {
  return (
    <Card className='custom-card'>
    <img id = 'img'src={cloth_item.matching_image} className = "card-img-top object-fit-scale" alt = {cloth_item.name} />
      <Card.Body>
      <Card.Title className='title1'>
       {cloth_item.name}
      </Card.Title>
      {cloth_item.brand_name && <Card.Text>Brand: {cloth_item.brand_name}</Card.Text>}
      </Card.Body>
    </Card>
  )
}

export default Cloth
