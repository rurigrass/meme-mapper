"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { MemeType, MemeValidator } from "@/lib/validators/meme";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { unknown } from "zod";
import Image from "next/image";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const form = useForm<MemeType>({
    resolver: zodResolver(MemeValidator),
    defaultValues: {
      name: "",
      url: "",
      video: "",
    },
  });

  console.log(form.watch());

  const { mutate: addMeme, isLoading } = useMutation({
    mutationFn: async ({ name, url, video }: MemeType) => {
      const payload: MemeType = { name, url, video };
      const { data } = await axios.post("/api/admin/add-meme", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          //Add a toast or something
          return console.log("need to be logged in");
        }
        if (err.response?.status === 409) {
          return console.log("meme already exists");
        }
        if (err.response?.status === 422) {
          return console.log("zod error");
        }
      }
      console.log("unknow error, please try again");
    },
  });

  return (
    <div className="flex justify-center align-middle">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add a new meme</CardTitle>
          <CardDescription>
            Fill in the details below to add a meme to the game
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((e) => addMeme(e))}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meme name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the name of the meme"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      Submit the name of the Meme
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meme URL</FormLabel>
                    <FormControl>
                      <Input placeholder="URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is a link to the meme.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meme URL</FormLabel>
                    <FormControl>
                      <Input
                        id="video"
                        type="file"
                        placeholder="Select a video file"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {field.value !== "" && (
                      <Image
                        src={field.value}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                      />
                    )}
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex align-middle">
                      Loading
                      <Loader2 className="mx-2 h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
