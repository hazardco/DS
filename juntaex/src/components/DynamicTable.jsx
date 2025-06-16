import React from 'react'
import { Eye, Edit, Trash } from 'lucide-react'
import { IconButton } from 'jex-ds'

const DynamicTable = ({ data, schema, onView, onEdit, onDelete }) => {
  // Elegimos el schema adecuado
  const effectiveSchema =
    schema?.type === 'array' && schema.items ? schema.items : schema
  const tableColumns = effectiveSchema?.properties
    ? Object.keys(effectiveSchema.properties)
    : []

  // Función para formatear el nombre de columna
  const formatHeader = (key) =>
    key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <div className="table-responsive">
<table className="table align-middle">
          <thead className="table-light">
          <tr>
            {tableColumns.map((col) => (
              <th key={col}>{formatHeader(col)}</th>
            ))}
           <th className="col-actions text-center">Acciones</th>
           </tr>
        </thead>
        <tbody>
          {data.map((item, row) => (
            <tr key={row} className="border-bottom"> 
              {tableColumns.map((col) => (
                <td key={col}>
                  {typeof item[col] === 'object' && item[col] !== null ? (
                    (() => {
                      const keys = Object.keys(item[col]).filter(
                        (k) => k !== 'id'
                      )
                      return keys.length > 0
                        ? item[col][keys[0]]
                        : JSON.stringify(item[col])
                    })()
                  ) : (
                    item[col]
                  )}
                </td>
              ))}
              <td className='col-actions text-end'>



              <div className="d-flex gap-2">                  
                <IconButton
                    icon="eye"
                    color="secondary"
                    size="small"
                    title="Ver"
                    onClick={() => onView?.(item)}

                  />
                  <IconButton
                    icon="edit"
                    color="secondary"
                    size="small"
                    title="Editar"
                    onClick={() => onEdit?.(item)}
                  />
                  <IconButton
                    icon="trash"
                    color="secondary"
                    size="small"
                    title="Borrar"
                    onClick={() => onDelete?.(item)}
                  />

                 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DynamicTable