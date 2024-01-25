'use client'
import { TodoSchema } from '@/lib/types'
import { addTodo } from '@/utils/actions'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import NewTodoForm from './NewTodoForm'

const EditTodoDialog = ({ open, onOpenChange, onClose, modal }) => {
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
        <NewTodoForm onClose={handleClose} onOpenChange={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

export default EditTodoDialog
