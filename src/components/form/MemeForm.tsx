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
import { useForm } from "react-hook-form";
import { MemeType, MemeValidator } from "@/lib/validators/meme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2, X } from "lucide-react";
import Map from "@/components/game/Map";
import { useState } from "react";
import { useCustomToast } from "@/components/ui/use-custom-toast";
import { toast } from "@/components/ui/use-toast";
import { capitalize } from "@/lib/utils";
import { useRouter } from "next/navigation";
import NameField from "./fields/NameField";
import DescriptionField from "./fields/DescriptionField";
import UrlField from "./fields/UrlField";
import MediaField from "./fields/MediaField";
import { MemeStatusTypes, memeType } from "@/lib/types";
import ScreenshotField from "./fields/ScreenshotField";
import AppleMapField from "./fields/AppleMapField";
import StatusField from "./fields/StatusField";

interface MemeFormProps {
  formType?: string;
  meme?: memeType | undefined;
}

const MemeForm = ({ formType, meme }: MemeFormProps) => {
  const { loginToast } = useCustomToast();
  // const { MAPKIT_TOKEN: token } = process.env;
  const token = process.env.NEXT_PUBLIC_MAPKIT_TOKEN;
  const router = useRouter();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<
    string | ArrayBuffer | null
  >(null);

  const form = useForm<MemeType>({
    resolver: zodResolver(MemeValidator),
    defaultValues: {
      id: meme?.id || "", // Use optional chaining to handle undefined meme
      name: meme?.name || "",
      description: meme?.description || "",
      url: meme?.url || "",
      video: meme?.fileUrl || "",
      screenshot: meme?.screenshotUrl || "",
      latlng: {
        lat: meme?.lat || undefined,
        lng: meme?.lng || undefined,
      },
      verified: meme?.verified || false,
      status: meme?.status || MemeStatusTypes.PENDING,
    },
  });

  //THIS BELOW WOULD HAVE WORKED FOR SHOWING THE SCREENSHOT INPUT HOWEVER THERE IS A WEIRD TYPE ERROR
  // console.log("FORMVALUES ", form.getValues("video")?.name?.includes(".mp4"));
  // console.log(meme?.fileUrl.includes("/video") === true);
  // console.log("PREVIEW ", preview?.toString().includes("video/"));
  // console.log("whats in the form bruh ", form.watch());

  const { mutate: requestMeme, isLoading: requestIsLoading } = useMutation({
    mutationFn: async ({
      name,
      description,
      url,
      latlng,
      verified,
      status,
    }: MemeType) => {
      console.log("MUTATE ", name, description, url, latlng, verified);
      const formData = new FormData();
      formData.set("name", name);
      formData.set("description", description);
      formData.set("url", url);
      formData.set("latlng", JSON.stringify(latlng));
      formData.set("verified", JSON.stringify(verified));
      formData.set("status", JSON.stringify(status));
      console.log("THE FORMDATA ", {
        name,
        url,
        description,
        latlng,
        verified,
        status,
      });

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
    mutationFn: async ({
      name,
      description,
      url,
      video,
      screenshot,
      latlng,
      verified,
      status,
    }: MemeType) => {
      console.log(
        "MUTATE ",
        name,
        description,
        url,
        video,
        screenshot,
        latlng,
        verified,
        status
      );

      const formData = new FormData();
      formData.set("name", name);
      formData.set("description", description);
      formData.set("url", url);
      formData.set("file", video);
      formData.set("screenshot", screenshot);
      formData.set("latlng", JSON.stringify(latlng));
      formData.set("verified", JSON.stringify(verified));
      formData.set("status", JSON.stringify(status));
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
      description,
      url,
      video,
      screenshot,
      latlng,
      verified,
      status,
    }: MemeType) => {
      const formData = new FormData();
      id && formData.set("id", id);
      formData.set("name", name);
      formData.set("description", description);
      formData.set("url", url);
      formData.set("file", video);
      formData.set("screenshot", screenshot);
      formData.set("latlng", JSON.stringify(latlng));
      formData.set("verified", JSON.stringify(verified));
      formData.set("status", JSON.stringify(status));
      // console.log("THE FORMDATA ", { id, name, url, video, latlng, verified });

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

  //HANDLES THE ONCHANGE OF FILE
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

  //HANDLE ONCHANGE OF SCREENSHOTURL
  const handleScreenshotChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];
    if (selectedFile) {
      const file = new FileReader();
      file.onload = () => {
        setScreenshotPreview(file.result);
      };
      file.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="flex justify-center align-middle">
      <Card className="w-full sm:w-[550px]  mx-4">
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
              <NameField control={form.control} />
              <DescriptionField control={form.control} />
              <UrlField control={form.control} />
              {formType !== "request" && (
                <>
                  <MediaField
                    control={form.control}
                    meme={meme}
                    preview={preview}
                    setPreview={setPreview}
                    handleOnChange={handleOnChange}
                  />
                  {/* ONLY LOAD SREENSHOT BELOW IF MEME OR PREVIEW IS TYPE VIDEO */}
                  {preview?.toString().includes("video/") === true ||
                  meme?.fileUrl.includes("/video") === true ? (
                    <ScreenshotField
                      control={form.control}
                      meme={meme}
                      screenshotPreview={screenshotPreview}
                      setScreenshotPreview={setScreenshotPreview}
                      handleScreenshotChange={handleScreenshotChange}
                    />
                  ) : (
                    ""
                  )}
                </>
              )}
              {/* Add latitude and longitude */}
              <AppleMapField
                control={form.control}
                initCoordinates={{ lat: meme?.lat, lng: meme?.lng }}
                updateCoordinates={(
                  lat: number | undefined,
                  lng: number | undefined
                ) => form.setValue("latlng", { lat, lng })}
              />
              {formType !== "request" && <StatusField control={form.control} />}
              <CardFooter className="flex justify-between">
                {/* send back to previous page */}
                <Button type="reset" variant="outline">
                  Cancel
                </Button>
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
