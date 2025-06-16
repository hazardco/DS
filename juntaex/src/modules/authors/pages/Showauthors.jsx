

// Import React and routing hooks
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Import form and UI components from JEX design system
import { Text, Select, Date, Button, Row, Col, FormContainer } from 'jex-ds'

// Inject dropdown endpoints mapping field names to API paths
const dropdownEndpoints = {}

// Define the Show component to display a single record
const Showauthors = () => {
  // Navigation and route parameter hooks
  const navigate = useNavigate()
  const { id } = useParams()

  // State for dropdown option lists and loaded record data
  const [dropdownOptions, setDropdownOptions] = useState({})
  const [loadedData, setLoadedData] = useState(null)

  // Prepare headers with optional auth token
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  // Load dropdown options and record data when component mounts or id changes
  useEffect(() => {
    // Fetch each dropdown's options
    Object.entries(dropdownEndpoints).forEach(([field, endpoint]) => {
      fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, { headers })
        .then(res => res.json())
        .then(data => setDropdownOptions(prev => ({ ...prev, [field]: data })))
        .catch(err => console.error(`Error loading dropdown '${field}':`, err))
    })

    // Fetch the specific record by ID
    fetch(`${import.meta.env.VITE_SERVER_URL}/authors/${id}`, { headers })
      .then(res => res.json())
      .then(data => {
        // Flatten nested references to their ID values
        const parsedData = { ...data }
        Object.keys(dropdownEndpoints).forEach(key => {
          if (parsedData[key]?.id) parsedData[key] = parsedData[key].id
        })
        setLoadedData(parsedData)
      })
      .catch(err => console.error('Error loading item:', err))
  }, [id])

  // Show loading indicator until data is available
  if (!loadedData) return <p>Loading...</p>

  // Render the form container with generated fields and a back button
  return (
    <FormContainer title="Show authors">
      <Row>
        {/* Injected markup for each schema field */}
        
        <Col size="6">
          <Text
            label="id"
            placeholder="id"
            value={loadedData?.id}
            disabled
          />
        </Col>
      
        <Col size="6">
          <Text
            label="name"
            placeholder="name"
            value={loadedData?.name}
            disabled
          />
        </Col>
      
        <Col size="6">
          <Text
            label="surname"
            placeholder="surname"
            value={loadedData?.surname}
            disabled
          />
        </Col>
      
        <Col size="6">
          <Text
            label="phone"
            placeholder="phone"
            value={loadedData?.phone}
            disabled
          />
        </Col>
      
      </Row>
      <Row>
        <Col size="3">
          {/* Back button to return to list view */}
          <Button
            label="Back"
            variant="secondary"
            onClick={() => navigate("/authors")}
          />
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Showauthors
