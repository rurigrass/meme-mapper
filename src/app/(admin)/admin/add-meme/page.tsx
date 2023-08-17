"use client";
import { FC, SyntheticEvent, useState } from "react";
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
import Image from "next/image";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const form = useForm<MemeType>({
    resolver: zodResolver(MemeValidator),
    defaultValues: {
      name: "",
      url: "",
      video: undefined,
    },
  });

  // console.log(form.watch());

  const { mutate: addMeme, isLoading } = useMutation({
    mutationFn: async ({ name, url, video }: MemeType) => {
      // const videoFileType = new FormData();
      // const videoData = videoFileType.set("file", video);
      const payload = { name, url, video };
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

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log();

    // console.log("file :", file);
    if (typeof file === "undefined") return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "test-mememapper-unsigned");
    formData.append("api_key", "BfCBn2fnldelOi301GDwHQ2NYxo");

    const results = await fetch(
      "https://api.cloudinary.com/v1_1/dexcxs4gk/auto/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log("results: ", results);
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);

    const file = new FileReader();

    file.onload = () => {
      setPreview(file.result);
    };

    file.readAsDataURL(target.files[0]);
  };

  console.log("PREVIEW ", preview?.toString().startsWith("data:image"));

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
              // onSubmit={form.handleSubmit((e) => addMeme(e))}
              onSubmit={handleOnSubmit}
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
                    <FormLabel>Meme file</FormLabel>
                    <FormControl>
                      <Input
                        id="video"
                        type="file"
                        placeholder="Select a video file"
                        accept="image/png, image/jpg, image/jpeg, video/mp4"
                        // {...field}
                        // onChange={(e) =>
                        //   field.onChange(e.target.files && e.target.files[0])
                        // }
                        onChange={handleOnChange}
                      />
                    </FormControl>
                    {preview && (
                      <p className="mt-5">
                        {preview?.toString().startsWith("data:image") ? (
                          <img src={preview as string} alt="Upload preview" />
                        ) : (
                          <video width="320" height="240" controls>
                            <source src={preview as string} type="video/mp4" />
                          </video>
                        )}
                      </p>
                    )}
                    <FormMessage />
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
