

// React and routing hooks
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// React Hook Form and Zod resolver
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// JEX-DS UI components and hooks
import { Text, Select, Date, Button, Row, Col, FormContainer, useToast } from 'jex-ds'

// Inject endpoints and schema
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

const Editcategories = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { toast } = useToast()

  // Initialize form with resolver and unregister on unmount
  const form = useForm({ resolver: zodResolver(formSchema), defaultValues, shouldUnregister: true })
  const { handleSubmit, formState, control, reset } = form

  // State for dropdown option lists and loaded record
  const [dropdownOptions, setDropdownOptions] = useState({})
  const [loadedData, setLoadedData] = useState(null)

  // Setup headers with optional auth token
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  // Fetch dropdown options and existing data on mount or id change
  useEffect(() => {
    Object.entries(dropdownEndpoints).forEach(([field, endpoint]) => {
      fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, { headers })
        .then(res => res.json())
        .then(data => setDropdownOptions(prev => ({ ...prev, [field]: data })))
        .catch(err => console.error(`Error loading dropdown '${field}':`, err))
    })
    fetch(`${import.meta.env.VITE_SERVER_URL}/categories/${id}`, { headers })
      .then(res => res.json())
      .then(data => {
        const parsedData = { ...data }
        Object.keys(dropdownEndpoints).forEach(key => { if (parsedData[key]?.id) parsedData[key] = parsedData[key].id })
        setLoadedData(parsedData)
      })
      .catch(err => console.error('Error loading item:', err))
  }, [id])

  // Reset form when data and dropdowns are ready
  useEffect(() => {
    if (!loadedData) return
    const allLoaded = Object.keys(dropdownEndpoints).every(key => dropdownOptions[key]?.length)
    if (allLoaded || Object.keys(dropdownEndpoints).length === 0) {
      reset(loadedData)
    }
  }, [loadedData, dropdownOptions])

  // Handle form submission to update record
  const onSubmit = values => {
    const payload = { ...values }
    Object.keys(dropdownEndpoints).forEach(field => {
      const selectedId = values[field]
      const fullObj = dropdownOptions[field]?.find(item => item.id === selectedId)
      if (fullObj) payload[field] = fullObj
    })

    fetch(`${import.meta.env.VITE_SERVER_URL}/categories/${id}`, {
      method: 'PUT', headers, body: JSON.stringify(payload)
    })
      .then(res => { if (!res.ok) throw new Error('Update failed')
        toast({ status: 'success', title: 'Update successful', content: 'Record updated.', button: { label: 'Go to list', iconRight: 'arrow-right' }, duration: 2000 })
        navigate('/categories')
      })
      .catch(err => console.error('Error:', err))
  }

  return (
    <FormContainer title={`Edit categories`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>{/* Generated fields */}
          
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
          <Col size="3"><Button label="Save changes" type="submit" /></Col>
        </Row>
      </form>
    </FormContainer>
  )
}

export default Editcategories
