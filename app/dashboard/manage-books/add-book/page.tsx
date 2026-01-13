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
import Form from "next/form"

const AddBook = () => {
  return (
    <div className="p-20">
      <Card>
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
          <CardDescription>
            Fill in the information below to add a new book.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form action={BookAddFormAction}>
            <FieldGroup>

              {/* Book Name */}
              <Field>
                <FieldLabel htmlFor="bookName">Book Name</FieldLabel>
                <Input
                  id="bookName"
                  name="bookName"
                  type="text"
                  placeholder="Clean Code"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="author">Author</FieldLabel>
                <Input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Robert C. Martin"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="genre">Genre</FieldLabel>
                <Input
                  id="genre"
                  name="genre"
                  type="text"
                  placeholder="Programming"
                  required
                />
              </Field>


              <Field>
                <FieldLabel htmlFor="totalCopies">Total Copies</FieldLabel>
                <Input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  placeholder="10"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="shelfLocation">Shelf Location</FieldLabel>
                <Input
                  id="shelfLocation"
                  name="shelfLocation"
                  type="text"
                  placeholder="Floor 2, room 14"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="publishedYear">Published Year</FieldLabel>
                <Input
                  id="publishedYear"
                  name="publishedYear"
                  type="text"
                  placeholder="Example : 2003"
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
