

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
const dropdownEndpoints = {"category":"/categories","author":"/authors","editorial":"/editorials"}
const openApiSchema = {"type":"object","properties":{"id":{"type":"integer","readOnly":true},"title":{"type":"string"},"category":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"description":{"type":"string"}},"required":["description"]},"author":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"name":{"type":"string"},"surname":{"type":"string"},"phone":{"type":"string"}},"required":["name","surname","phone"]},"editorial":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"name":{"type":"string"},"address":{"type":"string"}},"required":["name"]}},"required":["title","category","author","editorial"]}
const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: 'This field is required' }),
  category: z.number({ required_error: 'This field is required' }),
  author: z.number({ required_error: 'This field is required' }),
  editorial: z.number({ required_error: 'This field is required' })
})
const defaultValues = {
  id: 0,
  title: "",
  category: "",
  author: "",
  editorial: ""
}

// Define the Create component
const Createbooks = () => {
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

    fetch(`${import.meta.env.VITE_SERVER_URL}/books`, {
      method: 'POST', headers, body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error submitting form')
        // Show success toast and navigate to list
        toast({ status: 'success', title: 'Submission successful', content: 'The new books has been successfully created.', button: { label: 'Go to list', iconRight: 'arrow-right' }, duration: 2000 })
        navigate('/books')
      })
      .catch(err => console.error('Error:', err))
  }

  return (
    <FormContainer title={`Create books`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* Generated form fields based on schema */}
          
        <Col size="6">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Text
                label="title"
                placeholder="title"
                value={field.value}
                onChange={field.onChange}
                errorText={formState.errors["title"]?.message}
              />
            )}
          />
        </Col>
      
      {dropdownOptions["category"] && dropdownOptions["category"].length > 0 && (
        <Col size="6">
          <Controller
            control={control}
            name="category"
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <Select
                label="category"
                placeholder="category"
                options={dropdownOptions.category?.map(o => ({
                  label: o.name || o.description || o.title || o.id,
                  value: o.id,
                }))}
                value={field.value}
                onChange={(e) => {
                  const selectedValue = e?.target?.value || e
                  field.onChange(Number(selectedValue))
                }}
                errorText={formState.errors["category"]?.message}
                showReset
              />
            )}
          />
        </Col>
      )}
      
      {dropdownOptions["author"] && dropdownOptions["author"].length > 0 && (
        <Col size="6">
          <Controller
            control={control}
            name="author"
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <Select
                label="author"
                placeholder="author"
                options={dropdownOptions.author?.map(o => ({
                  label: o.name || o.description || o.title || o.id,
                  value: o.id,
                }))}
                value={field.value}
                onChange={(e) => {
                  const selectedValue = e?.target?.value || e
                  field.onChange(Number(selectedValue))
                }}
                errorText={formState.errors["author"]?.message}
                showReset
              />
            )}
          />
        </Col>
      )}
      
      {dropdownOptions["editorial"] && dropdownOptions["editorial"].length > 0 && (
        <Col size="6">
          <Controller
            control={control}
            name="editorial"
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <Select
                label="editorial"
                placeholder="editorial"
                options={dropdownOptions.editorial?.map(o => ({
                  label: o.name || o.description || o.title || o.id,
                  value: o.id,
                }))}
                value={field.value}
                onChange={(e) => {
                  const selectedValue = e?.target?.value || e
                  field.onChange(Number(selectedValue))
                }}
                errorText={formState.errors["editorial"]?.message}
                showReset
              />
            )}
          />
        </Col>
      )}
      
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

export default Createbooks
