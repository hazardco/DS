

// Import main layout component
import Layout from "@/layout/Layout"

// Import router creator from React Router
import { createBrowserRouter } from "react-router-dom"


// Import Dashboard page as a child route
import { Dashboard } from "@/modules/Dashboard/pages/Dashboard"

import Books from "@/modules/Books/pages/Books"

import CreateBooks from "@/modules/Books/pages/CreateBooks"

import Users from "@/modules/Users/pages/Users"

import CreateUsers from "@/modules/Users/pages/CreateUsers"

import Authors from "@/modules/Authors/pages/Authors"

import CreateAuthors from "@/modules/Authors/pages/CreateAuthors"

import Editorials from "@/modules/Editorials/pages/Editorials"

import CreateEditorials from "@/modules/Editorials/pages/CreateEditorials"

import Categories from "@/modules/Categories/pages/Categories"

import CreateCategories from "@/modules/Categories/pages/CreateCategories"

import ShowBooks from "@/modules/Books/pages/ShowBooks"

import EditBooks from "@/modules/Books/pages/EditBooks"

import ShowUsers from "@/modules/Users/pages/ShowUsers"

import EditUsers from "@/modules/Users/pages/EditUsers"

import ShowAuthors from "@/modules/Authors/pages/ShowAuthors"

import EditAuthors from "@/modules/Authors/pages/EditAuthors"

import ShowEditorials from "@/modules/Editorials/pages/ShowEditorials"

import EditEditorials from "@/modules/Editorials/pages/EditEditorials"

import ShowCategories from "@/modules/Categories/pages/ShowCategories"

import EditCategories from "@/modules/Categories/pages/EditCategories"


// Configure application routes
export const router = createBrowserRouter([
  
  // Protected and public routes under main layout
  {
    path: "/",
    element: 
      
      <Layout />  // No auth wrapper when login not required
      ,
    children: [
      // Default dashboard route
      { path: "/dashboard", element: <Dashboard /> },

      // Route for Books
      {
        path: "/books",
        element: <Books />
      },

      // Route for CreateBooks
      {
        path: "/books/create",
        element: <CreateBooks />
      },

      // Route for Users
      {
        path: "/users",
        element: <Users />
      },

      // Route for CreateUsers
      {
        path: "/users/create",
        element: <CreateUsers />
      },

      // Route for Authors
      {
        path: "/authors",
        element: <Authors />
      },

      // Route for CreateAuthors
      {
        path: "/authors/create",
        element: <CreateAuthors />
      },

      // Route for Editorials
      {
        path: "/editorials",
        element: <Editorials />
      },

      // Route for CreateEditorials
      {
        path: "/editorials/create",
        element: <CreateEditorials />
      },

      // Route for Categories
      {
        path: "/categories",
        element: <Categories />
      },

      // Route for CreateCategories
      {
        path: "/categories/create",
        element: <CreateCategories />
      },

      // Route for ShowBooks
      {
        path: "/books/:id",
        element: <ShowBooks />
      },

      // Route for EditBooks
      {
        path: "/books/edit/:id",
        element: <EditBooks />
      },

      // Route for ShowUsers
      {
        path: "/users/:id",
        element: <ShowUsers />
      },

      // Route for EditUsers
      {
        path: "/users/edit/:id",
        element: <EditUsers />
      },

      // Route for ShowAuthors
      {
        path: "/authors/:id",
        element: <ShowAuthors />
      },

      // Route for EditAuthors
      {
        path: "/authors/edit/:id",
        element: <EditAuthors />
      },

      // Route for ShowEditorials
      {
        path: "/editorials/:id",
        element: <ShowEditorials />
      },

      // Route for EditEditorials
      {
        path: "/editorials/edit/:id",
        element: <EditEditorials />
      },

      // Route for ShowCategories
      {
        path: "/categories/:id",
        element: <ShowCategories />
      },

      // Route for EditCategories
      {
        path: "/categories/edit/:id",
        element: <EditCategories />
      },

    ]
  }
])
