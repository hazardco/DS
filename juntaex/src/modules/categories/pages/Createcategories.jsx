

// React and routing imports
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// React Hook Form and Zod resolver
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// JEX-DS UI components and hooks
import { Text, Select, Date, Button, Row, Col, FormContainer, useToast } from 'jex-ds'

// Inject dropdown endpoints, OpenAPI schema, and computed form schema
const dropdownEndpoints = {}
const openApiSchema = {"type":"object","properties":{"id":{"type":"integer","readOnly":true},"description":{"type":"string"}},"required":["description"]}
const formSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1, { message: 'This field is required' })
})
const defaultValues = {
  id: 0,
  description: ""
}

// Define the Create component
const Createcategories = () => {
  const navigate = useNavigate()
  // State to store options for select fields
  const [dropdownOptions, setDropdownOptions] = useState({})
  const { toast } = useToast()

  // Initialize the form with resolver and default values
  const form = useForm({ resolver: zodResolver(formSchema), defaultValues, shouldUnregister: true })
  const { handleSubmit, formState, control } = form

  // Prepare headers for API requests with optional auth
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  // Fetch dropdown options on mount
  useEffect(() => {
    Object.entries(dropdownEndpoints).forEach(([field, endpoint]) => {
      fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, { headers })
        .then(res => res.json())
        .then(data => setDropdownOptions(prev => ({ ...prev, [field]: data })))
        .catch(err => console.error(`Error loading dropdown '${field}':`, err))
    })
  }, [])

  // Handle form submission to create new record
  const onSubmit = (values) => {
    const payload = { ...values }
    // Replace selected IDs with full objects in payload
    Object.keys(dropdownEndpoints).forEach(field => {
      const id = values[field]
      const obj = dropdownOptions[field]?.find(item => item.id === id)
      if (obj) payload[field] = obj
    })

    fetch(`${import.meta.env.VITE_SERVER_URL}/categories`, {
      method: 'POST', headers, body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error submitting form')
        // Show success toast and navigate to list
        toast({ status: 'success', title: 'Submission successful', content: 'The new categories has been successfully created.', button: { label: 'Go to list', iconRight: 'arrow-right' }, duration: 2000 })
        navigate('/categories')
      })
      .catch(err => console.error('Error:', err))
  }

  return (
    <FormContainer title={`Create categories`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* Generated form fields based on schema */}
          
        <Col size="6">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Text
                label="description"
                placeholder="description"
                value={field.value}
                onChange={field.onChange}
                errorText={formState.errors["description"]?.message}
              />
            )}
          />
        </Col>
      
        </Row>
        <Row>
          <Col size="3">
            {/* Submit button */}
            <Button label="Submit" type="submit" />
          </Col>
        </Row>
      </form>
    </FormContainer>
  )
}

export default Createcategories
