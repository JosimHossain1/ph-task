export const dynamic = "force-dynamic"

import { BookAddFormAction } from "@/app/serverActions/bookAction"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Form from "next/form"

const AddBook = () => {
  return (
    <div className="p-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
          <CardDescription>
            Provide all required information to add a book.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form action={BookAddFormAction}>
            <FieldGroup>

              <Field>
                <FieldLabel htmlFor="bookName">Book Name</FieldLabel>
                <Input
                  id="bookName"
                  name="bookName"
                  placeholder="Clean Code"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="author">Author</FieldLabel>
                <Input
                  id="author"
                  name="author"
                  placeholder="Robert C. Martin"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="genre">Genre ID</FieldLabel>
                <Input
                  id="genre"
                  name="genre"
                  placeholder="Genre ID"
                  required
                />
              </Field>


              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write a short description about the book..."
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="coverImage">Cover Image URL</FieldLabel>
                <Input
                  id="coverImage"
                  name="coverImage"
                  placeholder="https://image-url.com/book.jpg"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="totalPages">Total Pages</FieldLabel>
                <Input
                  id="totalPages"
                  name="totalPages"
                  type="number"
                  placeholder="464"
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full">
                  Add Book
                </Button>
              </Field>

            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddBook
