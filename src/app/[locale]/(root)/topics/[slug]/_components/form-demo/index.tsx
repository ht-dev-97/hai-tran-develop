/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { showToast } from '@/components/common/toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { reportBugSchema } from '@/lib/validations/report-bug.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleX } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const FormDemo = () => {
  const [files, setFiles] = useState<
    { name: string; size: number; file: File }[]
  >([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof reportBugSchema>>({
    resolver: zodResolver(reportBugSchema)
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const maxTotalSize = 20 * 1024 * 1024 // 20MB

    const validFiles = selectedFiles.filter((file) => {
      const isImage = file.type.startsWith('image/')
      const isVideo = file.type.startsWith('video/')

      if (!isImage && !isVideo) {
        showToast.error(`File ${file.name} is not an image or video.`)
        return false
      }
      return true
    })

    const totalSize = validFiles.reduce((size, file) => size + file.size, 0)

    if (totalSize <= maxTotalSize) {
      setFiles((prevFiles) => {
        const newFiles = validFiles.filter(
          (file) =>
            !prevFiles.some(
              (existingFile) =>
                existingFile.name === file.name &&
                existingFile.size === file.size
            )
        )
        return [
          ...prevFiles,
          ...newFiles.map((file) => ({
            name: file.name,
            size: file.size,
            file
          }))
        ]
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } else {
      showToast.error('Total file size exceeds 20MB.')
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const resetFormAndState = () => {
    form.reset({
      name: '',
      email: '',
      message: ''
    })
    form.clearErrors()
    setFiles([])
  }

  const onSubmit = async (values: z.infer<typeof reportBugSchema>) => {
    try {
      const attachments = await Promise.all(
        files.map(async ({ file }) => {
          const fileData = new Uint8Array(await file.arrayBuffer())
          return {
            data: fileData,
            filename: file.name
          }
        })
      )

      const dataSubmit = {
        name: values.name,
        email: values.email,
        message: values.message,
        attachments
      }

      console.log('dataSubmit', dataSubmit)

      showToast.success('Successfully submitted')
      resetFormAndState()
    } catch (error: any) {
      showToast.error(error.message)
    }
  }

  const handleCancelUserFeedback = () => {
    resetFormAndState()
  }

  return (
    <div className="mx-auto max-w-xl w-full border border-green-500 rounded-lg p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="text-lg text-green-500 font-medium mb-4">
            Report a Bug
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1.5 mb-4">
                <FormLabel className="text-sm text-black font-medium">
                  Full name
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Full name"
                    {...field}
                    value={field.value ?? ''}
                    className="py-[10px] px-[14px] bg-gray-100 rounded-lg text-black font-medium text-sm border-none outline-none placeholder:text-black placeholder:opacity-100"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5 mb-4">
                <FormLabel className="text-sm text-black font-medium">
                  Email
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                    value={field.value ?? ''}
                    className="py-[10px] px-[14px] bg-gray-100 rounded-lg text-black font-medium text-sm border-none outline-none placeholder:text-black placeholder:opacity-100"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-1.5 mb-2">
                <FormLabel className="text-sm text-black font-medium">
                  Description
                  <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="What did you expect?"
                    {...field}
                    value={field.value ?? ''}
                    className="py-[10px] px-[14px] bg-gray-100 rounded-lg text-black font-medium text-sm border-none outline-none placeholder:text-black placeholder:opacity-100"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <div className="mb-6">
            <div className="relative mb-2 rounded-[6px] border border-gray-500 transition-all duration-200 ease-linear hover:border-green-500">
              <Input
                type="file"
                name="file"
                id="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="absolute w-full h-full opacity-0"
              />
              <div className="flex item-center justify-center gap-2 py-3 px-4">
                <span className="text-black text-sm font-medium">
                  Add Attachment
                </span>
              </div>
            </div>
            {files.length > 0 && (
              <div className="flex flex-col gap-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="basis-3/4 text-black text-[13px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {file.name}
                    </span>
                    <div className="basis-1/4 flex items-center justify-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-black text-[13px]">
                          {(file.size / 1024)?.toFixed(2)}KB
                        </span>
                      </div>
                      <div
                        onClick={() => handleRemoveFile(index)}
                        className="cursor-pointer hover:opacity-80"
                      >
                        <CircleX />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-3">
            <Button
              type="submit"
              className="h-11 w-full flex items-center justify-center py-3 px-4 bg-green-500 rounded-md text-black text-sm font-medium hover:bg-green-500/80 shadow-none"
            >
              Send Bug Report
            </Button>
            <Button
              type="button"
              className="h-11 w-full flex items-center justify-center py-3 px-4 bg-gray-200 rounded-md text-black text-sm font-medium hover:bg-gray-200/80 shadow-none"
              onClick={handleCancelUserFeedback}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FormDemo
