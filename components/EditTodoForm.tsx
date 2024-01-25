'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { addTodo } from '@/utils/actions'

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title must contain more then 1 character',
    })
    .max(50, {
      message: 'Title cannot contain more then 50 characters',
    }),
  content: z
    .string()
    .trim()
    .min(1, {
      message: 'Todo must contain more then 1 character',
    })
    .max(100, {
      message: 'Todo cannot contain more then 100 characters',
    }),
  tags: z.string().trim().optional(),
})

export const EditTodoForm = ({ onClose, onOpenChange }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const processedValues = {
      ...values,
      tags: (values.tags ?? '').split(' ').filter((tag) => tag.trim() !== ''),
    }

    const todo = {
      title: processedValues.title,
      content: processedValues.content,
      tags: processedValues.tags,
    }

    try {
      const result = await addTodo(todo)
      if (result) {
        toast.success('Todo added successfully')
        form.reset({
          title: '',
          content: '',
          tags: '',
        })
        onClose()
      }
    } catch {
      toast.error('Failed to add todo')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* title input form field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* content input form field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Write a little about your todo"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* tags form field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tags are seperated by a space" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default EditTodoForm
