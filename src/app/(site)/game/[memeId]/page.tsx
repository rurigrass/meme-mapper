import Map from "@/components/game/Map";
import TestMap from "@/components/game/TestMap";
import { db } from "@/lib/db";

interface PageProps {
  params: {
    memeId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { memeId } = params;

  const meme = await db.meme.findFirst({
    where: {
      id: memeId,
    },
  });

  return (
    <div className="flex flex-col h-screen justify-between pt-14">
      <div className="">
        is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a
        type specimen book. It has survived not only five centuries, but also
        the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop
      </div>
      {/* <Map
        updateCoordinates={(lat: number, lng: number) =>
          form.setValue("latlng", { lat, lng })
        }
      /> */}
      <div>
        <TestMap />
        <div className="flex justify-center">Guess</div>
      </div>
    </div>
  );
};

export default Page;
