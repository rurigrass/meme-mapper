"use client";
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
import { Loader2, X } from "lucide-react";
import Map from "@/components/game/Map";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useCustomToast } from "@/components/ui/use-custom-toast";
import { toast } from "@/components/ui/use-toast";
import { capitalize } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type MemeProps = {
  id: string;
  name: string;
  url: string;
  fileUrl: string;
  lat: number;
  lng: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string | null;
};

interface MemeFormProps {
  formType?: string;
  meme?: MemeProps | undefined;
}

const MemeForm = ({ formType, meme }: MemeFormProps) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();
  const pathname = usePathname();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const form = useForm<MemeType>({
    resolver: zodResolver(MemeValidator),
    defaultValues: {
      id: meme?.id || "", // Use optional chaining to handle undefined meme
      name: meme?.name || "",
      url: meme?.url || "",
      video: meme?.fileUrl || "",
      latlng: {
        lat: meme?.lat || 0,
        lng: meme?.lng || 0,
      },
      verified: meme?.verified || false,
    },
  });

  // console.log("whats in the form bruh ", form.watch());

  const { mutate: requestMeme, isLoading: requestIsLoading } = useMutation({
    mutationFn: async ({ name, url, latlng, verified }: MemeType) => {
      console.log("MUTATE ", name, url, latlng, verified);
      const formData = new FormData();
      formData.set("name", name);
      formData.set("url", url);
      formData.set("latlng", JSON.stringify(latlng));
      formData.set("verified", JSON.stringify(verified));
      console.log("THE FORMDATA ", { name, url, latlng, verified });

      const { data } = await axios.post(`/api/request-meme`, formData);

      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
        if (err.response?.status === 409) {
          return toast({
            title: "Meme already exists.",
            description:
              "Please check and see if this is the same Meme we have already.",
            variant: "destructive",
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Something went wrong",
            description: "Zod Error",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not add meme.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      //should push to user page with pending requests
      router.back();
      router.refresh();
      return toast({
        title: "Success!",
        description: "Your Meme request has been submitted",
      });
    },
  });

  const { mutate: addMeme, isLoading: addIsLoading } = useMutation({
    mutationFn: async ({ name, url, video, latlng, verified }: MemeType) => {
      console.log("MUTATE ", name, url, video, latlng, verified);

      const formData = new FormData();
      formData.set("name", name);
      formData.set("url", url);
      formData.set("file", video);
      formData.set("latlng", JSON.stringify(latlng));
      formData.set("verified", JSON.stringify(verified));
      // console.log("THE FORMDATA ", formData);
      const { data } = await axios.post("/api/admin/add-meme", formData);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
        if (err.response?.status === 409) {
          return toast({
            title: "Meme already exists.",
            description:
              "Please check and see if this is the same Meme we have already.",
            variant: "destructive",
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Something went wrong",
            description: "Zod Error",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not add meme.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      //should push to user page with pending requests
      router.back();
      router.refresh();
      return toast({
        title: "Success!",
        description: "Your Meme has been added",
      });
    },
  });

  const { mutate: editMeme, isLoading: editIsLoading } = useMutation({
    mutationFn: async ({
      id,
      name,
      url,
      video,
      latlng,
      verified,
    }: MemeType) => {
      const formData = new FormData();
      id && formData.set("id", id);
      formData.set("name", name);
      formData.set("url", url);
      formData.set("file", video);
      formData.set("latlng", JSON.stringify(latlng));
      formData.set("verified", JSON.stringify(verified));
      console.log("THE FORMDATA ", { id, name, url, video, latlng, verified });

      const { data } = await axios.patch(`/api/admin/edit-meme`, formData);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
        if (err.response?.status === 409) {
          return toast({
            title: "Meme already exists.",
            description:
              "Please check and see if this is the same Meme we have already.",
            variant: "destructive",
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Something went wrong",
            description: "Zod Error",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not add meme.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      //should push to user page with pending requests
      router.back();
      router.refresh();
      return toast({
        title: "Success!",
        description: "Your Meme has been updated",
      });
    },
  });

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log("HANDLE ONCHANGE BEING CALLED ");
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const selectedFile = target.files[0];

    if (selectedFile) {
      const file = new FileReader();

      file.onload = () => {
        setPreview(file.result);
      };

      if (selectedFile.type.startsWith("image")) {
        // Handle image file
        file.readAsDataURL(selectedFile);
      } else if (selectedFile.type.startsWith("video")) {
        // Handle video file
        // You might need to handle video differently here
        // Depending on what you want to do with it
        file.readAsDataURL(selectedFile);
      }
    }
  };

  //   console.log("PREVIEW ", preview);

  return (
    <div className="flex justify-center align-middle">
      <Card className="min-w-[250px]">
        <CardHeader>
          <CardTitle>{formType && capitalize(formType)} meme</CardTitle>
          <CardDescription>
            Fill in the details below to add a meme to the game
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                console.log("Form data:", data);
                console.log("Form type:", formType); // Check the formType value

                if (formType === "request") {
                  console.log("Requesting meme...");
                  requestMeme(data); // Call requestMeme function
                } else if (formType === "add") {
                  console.log("Adding meme...");
                  addMeme(data);
                } else {
                  console.log("Editing meme...");
                  editMeme(data);
                }
              })}
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
              {formType !== "request" && (
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
                          onChange={(e) => {
                            field.onChange(e.target.files && e.target.files[0]),
                              handleOnChange(e);
                          }}
                        />
                      </FormControl>
                      {/* A remove button here could be good but not essential */}
                      <div className="mt-5 flex justify-center">
                        {preview ? (
                          <div className="relative">
                            <div className="absolute top-2 right-2 z-10">
                              <Button
                                onClick={() => {
                                  setPreview(null),
                                    field.onChange(meme?.fileUrl);
                                }}
                                className="h-6 w-6 p-0 rounded-md "
                                //   variant="subtle"
                                aria-label="close modal"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            {preview?.toString().startsWith("data:image") ? (
                              <img
                                src={preview as string}
                                alt="Upload preview"
                                className="rounded-md"
                              />
                            ) : (
                              <video
                                width="320"
                                height="240"
                                controls
                                className="rounded-md"
                              >
                                <source
                                  src={preview as string}
                                  type="video/mp4"
                                />
                              </video>
                            )}
                          </div>
                        ) : (
                          <>
                            {meme?.fileUrl.includes("/image") && (
                              <img
                                src={meme?.fileUrl}
                                alt="Upload preview"
                                className="rounded-md"
                              />
                            )}
                            {meme?.fileUrl.includes("/video") && (
                              <video
                                width="320"
                                height="240"
                                controls
                                className="rounded-md"
                              >
                                <source src={meme?.fileUrl} type="video/mp4" />
                              </video>
                            )}
                          </>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {/* Add latitude and longitude */}
              <FormField
                control={form.control}
                name="latlng"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meme Location</FormLabel>
                    <FormDescription>
                      Please pin the location of the meme on the map
                    </FormDescription>
                    <Map
                      initCoordinates={{ lat: meme?.lat, lng: meme?.lng }}
                      updateCoordinates={(lat: number, lng: number) =>
                        form.setValue("latlng", { lat, lng })
                      }
                    />
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          disabled
                          placeholder="lat"
                          value={field.value.lat}
                        />
                      </FormControl>
                      <FormControl>
                        <Input
                          disabled
                          placeholder="lng"
                          value={field.value.lng}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {formType !== "request" && (
                <FormField
                  control={form.control}
                  name="verified"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Verified</FormLabel>
                        <FormDescription>
                          Toggle on to verify meme location.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <CardFooter className="flex justify-between">
                {/* send back to previous page */}
                <Button variant="outline">Cancel</Button>
                <Button
                  type="submit"
                  disabled={requestIsLoading || addIsLoading || editIsLoading}
                >
                  {requestIsLoading || addIsLoading || editIsLoading ? (
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

export default MemeForm;
