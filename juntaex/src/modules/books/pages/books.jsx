// Import React hooks for state and effects
import React, { useEffect, useState } from 'react'
// Import UI components and toast utilities from JEX design system
import { Button, Notification, Toast, useToast } from 'jex-ds'
// Import Plus icon for action buttons
import { Plus } from 'lucide-react'
// Hook for navigation between routes
import { useNavigate } from 'react-router-dom'

// Import dynamic table component for listing data
import DynamicTable from '@/components/DynamicTable'

// Injected JSON schema for rendering table and forms
const schema = {"type":"object","properties":{"id":{"type":"integer","readOnly":true},"title":{"type":"string"},"category":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"description":{"type":"string"}},"required":["description"]},"author":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"name":{"type":"string"},"surname":{"type":"string"},"phone":{"type":"string"}},"required":["name","surname","phone"]},"editorial":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"name":{"type":"string"},"address":{"type":"string"}},"required":["name"]}},"required":["title","category","author","editorial"]}
// Injected endpoints configuration for conditional actions
const endpoints = {"GET":{"operationId":"getBooks","summary":"Obtener lista de libros","responses":{"200":{"description":"Lista de libros","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"title":{"type":"string"},"category":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"description":{"type":"string"}},"required":["description"]},"author":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"name":{"type":"string"},"surname":{"type":"string"},"phone":{"type":"string"}},"required":["name","surname","phone"]},"editorial":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"name":{"type":"string"},"address":{"type":"string"}},"required":["name"]}},"required":["title","category","author","editorial"]}}}}}}},"POST":{"operationId":"createBook","summary":"Crear un nuevo libro","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"title":{"type":"string"},"category":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"description":{"type":"string"}},"required":["description"]},"author":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"name":{"type":"string"},"surname":{"type":"string"},"phone":{"type":"string"}},"required":["name","surname","phone"]},"editorial":{"type":"object","properties":{"id":{"type":"integer","readOnly":true},"name":{"type":"string"},"address":{"type":"string"}},"required":["name"]}},"required":["title","category","author","editorial"]}}}},"responses":{"201":{"description":"Libro creado"}}}}

// Define the component using the injected componentName
const books = () => {
  // State to hold fetched data items
  const [data, setData] = useState([])
  // Loading state for initial data fetch
  const [loading, setLoading] = useState(true)
  // Current pagination page
  const [currentPage, setCurrentPage] = useState(1)
  // Toast utility for success/error notifications
  const { toast } = useToast()

  // State to track which item is pending deletion
  const [deleteId, setDeleteId] = useState(null)
  // Control visibility of the confirmation modal
  const [showModal, setShowModal] = useState(false)

  // Number of items displayed per page
  const itemsPerPage = 10
  // Navigation hook for programmatically changing routes
  const navigate = useNavigate()

  // Retrieve auth token from localStorage if available
  const token = localStorage.getItem('token')
  // Setup default headers for API requests
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Fetch data on component mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/books`, { headers })
      .then((res) => res.json())
      .then((data) => {
        // Populate state and turn off loading indicator
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
        setLoading(false)
      })
  }, [])

  // Trigger deletion confirmation modal
  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowModal(true)
  }

  // Execute delete request after user confirmation
  const handleDeleteConfirmed = () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/books/${deleteId}`, {
      method: 'DELETE',
      headers
    })
      .then((res) => {
        if (res.ok) {
          // Remove deleted item from table and show toast
          setData((prev) => prev.filter((item) => item.id !== deleteId))
          toast({
            hasCloseButton: true,
            status: 'success',
            title: 'Item deleted successfully',
            content: 'The new books has been successfully deleted.',
            button: { label: 'Go to list', iconRight: 'arrow-right' },
            duration: 2000
          })
        } else {
          console.error('Error deleting item:', res.statusText)
        }
      })
      .catch((err) => {
        console.error('Error deleting item:', err)
      })
    // Close the confirmation modal
    setShowModal(false)
  }

  // Show loading indicator while data is being fetched
  if (loading) return <div className="text-center py-5">Loading...</div>

  // Calculate pagination indices
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="container-fluid p-4">
      {/* Header with title and conditional Add New button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">books List</h1>
        {endpoints.POST && (
          <Button
            color="primary"
            iconLeft="plus"
            label="Add New"
            onClick={() => navigate(`/books/create`)}
          />
        )}
      </div>

      {/* Dynamic table for current page items */}
      <DynamicTable
        data={currentItems}
        schema={schema}
        onView={(item) => navigate(`/books/${item.id}`)}
        onEdit={(item) => navigate(`/books/edit/${item.id}`)}
        onDelete={(item) => confirmDelete(item.id)}
        endpoints={endpoints}
      />

      {/* Pagination controls if multiple pages exist */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button
            color="tertiary"
            size="small"
            label="Prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          />
          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            color="tertiary"
            size="small"
            label="Next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          />
        </div>
      )}

      {/* Confirmation modal using Notification component */}
      {showModal && (
        <Notification
          hasCloseButton
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          primaryButton={{
            color: 'primary',
            iconRight: 'trash',
            label: 'Delete',
            size: 'medium',
            onClick: handleDeleteConfirmed
          }}
          secondaryButton={{
            color: 'secondary',
            iconRight: 'x',
            label: 'Cancel',
            size: 'medium',
            onClick: () => setShowModal(false)
          }}
          text="Are you sure you want to delete this item? This action cannot be undone."
          title="Confirm deletion"
        />
      )}
    </div>
  )
}

// Export the component with the injected name
export default books
