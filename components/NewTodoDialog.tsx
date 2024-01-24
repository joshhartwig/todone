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

const NewTodoDialog = ({ open, onOpenChange, onClose, modal }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog
      open={true}
      onOpenChange={onOpenChange}
      onClose={handleClose}
      modal={modal}
    >
      <DialogTitle>Open</DialogTitle>
      <DialogContent>
        <NewTodoForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

export default NewTodoDialog
