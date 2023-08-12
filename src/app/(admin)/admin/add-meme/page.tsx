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

interface pageProps {}

const page: FC<pageProps> = ({}) => {
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
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of the meme" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Input id="url" placeholder="Paste meme URL" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
