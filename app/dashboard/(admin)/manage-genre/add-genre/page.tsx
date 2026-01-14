export const dynamic = "force-dynamic"

import { AddGenreAction } from "@/app/serverActions/genreAction"
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

const CreateGenre = async() => {

  return (
    <div className="p-20">
      <Card>
        <CardHeader>
          <CardTitle>Add New Genre</CardTitle>
          <CardDescription>
            Fill in the information below to add a new Genre.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form action={AddGenreAction}>
            <FieldGroup>

              {/* Genre Name */}
              <Field>
                <FieldLabel htmlFor="genreName">Genre Name</FieldLabel>
                <Input
                  id="genreName"
                  name="genreName"
                  type="text"
                  placeholder="Science Fiction"
                  required
                />
              </Field>


              <Field>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <Input
                  id="slug"
                  name="slug"
                  type="text"
                  placeholder="science-fic"
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full">
                  Create Genre
                </Button>
              </Field>

            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateGenre
