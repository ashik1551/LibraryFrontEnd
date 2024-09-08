import React from 'react'
import Card from 'react-bootstrap/Card';

function Footer() {
  return (
    <div>
      <Card className="text-center text-light bg-secondary">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-light">2 days ago</Card.Footer>
      </Card>
    </div>
  )
}

export default Footer