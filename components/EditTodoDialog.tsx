'use client'
import { TodoSchema } from '@/lib/types'
import { addTodo } from '@/utils/actions'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import EditTodoForm from './EditTodoForm'

const EditTodoDialog = ({ open, onOpenChange, onClose, modal, todo }) => {
  const [Open, setOpen] = useState(false)

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false)
    }

    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogTitle>Open</DialogTitle>
      <DialogContent>
        <EditTodoForm
          onClose={handleClose}
          onOpenChange={handleClose}
          todo={todo}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditTodoDialog
