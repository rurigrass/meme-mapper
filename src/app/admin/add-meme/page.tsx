"use client";
import { useState } from "react";
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
import Map from "@/components/game/Map";
import { Switch } from "@/components/ui/switch";
import { useCustomToast } from "@/components/ui/use-custom-toast";
import { toast } from "@/components/ui/use-toast";
import MemeForm from "@/components/admin/MemeForm";

const Page = ({}) => {
  // const { loginToast } = useCustomToast();
  // const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  // const form = useForm<MemeType>({
  //   resolver: zodResolver(MemeValidator),
  //   defaultValues: {
  //     id: "",
  //     name: "",
  //     url: "",
  //     video: undefined,
  //     latlng: {
  //       lat: 0,
  //       lng: 0,
  //     },
  //     verified: false,
  //   },
  // });

  // // console.log("whats in the form bruh ", form.watch());

  // const { mutate: addMeme, isLoading } = useMutation({
  //   mutationFn: async ({ name, url, video, latlng, verified }: MemeType) => {
  //     console.log("MUTATE ", name, url, video, latlng, verified);

  //     const formData = new FormData();
  //     formData.set("name", name);
  //     formData.set("url", url);
  //     formData.set("file", video);
  //     formData.set("latlng", JSON.stringify(latlng));
  //     formData.set("verified", JSON.stringify(verified));
  //     // console.log("THE FORMDATA ", formData);
  //     const { data } = await axios.post("/api/admin/add-meme", formData);
  //     return data;
  //   },
  //   onError: (err) => {
  //     if (err instanceof AxiosError) {
  //       if (err.response?.status === 401) {
  //         return loginToast();
  //       }
  //       if (err.response?.status === 409) {
  //         return toast({
  //           title: "Meme already exists.",
  //           description:
  //             "Please check and see if this is the same Meme we have already.",
  //           variant: "destructive",
  //         });
  //       }
  //       if (err.response?.status === 422) {
  //         return toast({
  //           title: "Something went wrong",
  //           description: "Zod Error",
  //           variant: "destructive",
  //         });
  //       }
  //     }
  //     toast({
  //       title: "There was an error.",
  //       description: "Could not add meme.",
  //       variant: "destructive",
  //     });
  //   },
  // });

  // const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   // console.log("HANDLE ONCHANGE BEING CALLED ");

  //   const target = e.target as HTMLInputElement & {
  //     files: FileList;
  //   };

  //   const selectedFile = target.files[0];

  //   if (selectedFile) {
  //     const file = new FileReader();

  //     file.onload = () => {
  //       setPreview(file.result);
  //     };

  //     if (selectedFile.type.startsWith("image")) {
  //       // Handle image file
  //       file.readAsDataURL(selectedFile);
  //     } else if (selectedFile.type.startsWith("video")) {
  //       // Handle video file
  //       // You might need to handle video differently here
  //       // Depending on what you want to do with it
  //       file.readAsDataURL(selectedFile);
  //     }
  //   }

  //   // const file = new FileReader();

  //   // file.onload = () => {
  //   //   setPreview(file.result);
  //   // };

  //   // file.readAsDataURL(target.files[0]);
  // };

  // const handleUpdateCoordinates = (lat: number, lng: number) => {
  //   console.log("UPDATE COOOORRRDS ", lat, lng);
  //   setValue("latlng", { lat, lng });
  // };

  return (
    // <div className="flex justify-center align-middle">
    //   <Card className="min-w-[250px]">
    //     <CardHeader>
    //       <CardTitle>Add a new meme</CardTitle>
    //       <CardDescription>
    //         Fill in the details below to add a meme to the game
    //       </CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <Form {...form}>
    //         <form
    //           onSubmit={form.handleSubmit((e) => addMeme(e))}
    //           className="space-y-8"
    //         >
    //           <FormField
    //             control={form.control}
    //             name="name"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Meme name</FormLabel>
    //                 <FormControl>
    //                   <Input
    //                     placeholder="Enter the name of the meme"
    //                     {...field}
    //                   />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             control={form.control}
    //             name="url"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Meme URL</FormLabel>
    //                 <FormControl>
    //                   <Input placeholder="URL" {...field} />
    //                 </FormControl>
    //                 <FormDescription>
    //                   This is a link to the meme.
    //                 </FormDescription>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             control={form.control}
    //             name="video"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Meme file</FormLabel>
    //                 <FormControl>
    //                   <Input
    //                     id="video"
    //                     type="file"
    //                     placeholder="Select a video file"
    //                     accept="image/png, image/jpg, image/jpeg, video/mp4"
    //                     onChange={(e) => {
    //                       field.onChange(e.target.files && e.target.files[0]),
    //                         handleOnChange(e);
    //                     }}
    //                   />
    //                 </FormControl>
    //                 {preview && (
    //                   <div className="mt-5 flex justify-center">
    //                     {preview?.toString().startsWith("data:image") ? (
    //                       <img src={preview as string} alt="Upload preview" />
    //                     ) : (
    //                       <video
    //                         width="320"
    //                         height="240"
    //                         controls
    //                         className="justify-center"
    //                       >
    //                         <source src={preview as string} type="video/mp4" />
    //                       </video>
    //                     )}
    //                   </div>
    //                 )}
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //           {/* Add latitude and longitude */}
    //           <FormField
    //             control={form.control}
    //             name="latlng"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Meme Location</FormLabel>
    //                 <FormDescription>
    //                   Please pin the location of the meme on the map
    //                 </FormDescription>
    //                 <Map
    //                   updateCoordinates={(lat: number, lng: number) =>
    //                     form.setValue("latlng", { lat, lng })
    //                   }
    //                 />
    //                 <div className="flex gap-2">
    //                   <FormControl>
    //                     <Input
    //                       disabled
    //                       placeholder="lat"
    //                       value={field.value.lat}
    //                     />
    //                   </FormControl>
    //                   <FormControl>
    //                     <Input
    //                       disabled
    //                       placeholder="lng"
    //                       value={field.value.lng}
    //                     />
    //                   </FormControl>
    //                 </div>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />

    //           <FormField
    //             control={form.control}
    //             name="verified"
    //             render={({ field }) => (
    //               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
    //                 <div className="space-y-0.5">
    //                   <FormLabel className="text-base">Verified</FormLabel>
    //                   <FormDescription>
    //                     Toggle on to verify meme location.
    //                   </FormDescription>
    //                 </div>
    //                 <FormControl>
    //                   <Switch
    //                     checked={field.value}
    //                     onCheckedChange={field.onChange}
    //                   />
    //                 </FormControl>
    //               </FormItem>
    //             )}
    //           />

    //           <CardFooter className="flex justify-between">
    //             {/* send back to previous page */}
    //             <Button variant="outline">Cancel</Button>
    //             <Button type="submit" disabled={isLoading}>
    //               {isLoading ? (
    //                 <div className="flex align-middle">
    //                   Loading
    //                   <Loader2 className="mx-2 h-4 w-4 animate-spin" />
    //                 </div>
    //               ) : (
    //                 "Submit"
    //               )}
    //             </Button>
    //           </CardFooter>
    //         </form>
    //       </Form>
    //     </CardContent>
    //   </Card>
    // </div>
    <MemeForm formType="add" />
  );
};

export default Page;
