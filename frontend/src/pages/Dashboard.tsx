import {
  NextUIProvider,
  Card,
  CardBody,
  Button,
  CardFooter,
  CardHeader,
  Avatar,
  Divider,
} from "@nextui-org/react";
import { Beer, Trophy, Video, Users } from "lucide-react";
import AppNavbar from "../shared/Navbar";
import StatsSection from "../components/StatsSection";
import MyEntries from "../components/sections/MyEntries";
import OthersEntries from "../components/sections/OthersEntries";
import { useUserStore } from "../libs/zustand/auth";

export default function Dashboard() {
  const { user } = useUserStore();
  const steps = [
    {
      icon: <Beer className="w-12 h-12 text-[#7242f5]" />,
      title: "Create an Entry",
      description:
        "When you score 0 points in your fantasy league, create a new entry in the dashboard.",
    },
    {
      icon: <Video className="w-12 h-12 text-[#7242f5]" />,
      title: "Record Your Chug",
      description:
        "Chug a beer and record a video of your epic (or not so epic) performance.",
    },
    {
      icon: <Users className="w-12 h-12 text-[#7242f5]" />,
      title: "Share and Engage",
      description:
        "Upload your video for others to see. Comment on and rate other challengers' videos.",
    },
    {
      icon: <Trophy className="w-12 h-12 text-[#7242f5]" />,
      title: "Climb the Leaderboard",
      description:
        "Earn points based on your chugging speed and style. Rise through the ranks!",
    },
  ];

  return (
    <NextUIProvider>
      <AppNavbar />
      {user ? (
        <>
          <div className="  p-8 w-full">
            <main className="container mx-auto">
              <h1 className="text-4xl font-bold mb-8 text-center ">
                Chug Master Dashboard
              </h1>
              <StatsSection />
            </main>
          </div>
          <MyEntries />
          <OthersEntries />
        </>
      ) : null}

      <div className="min-h-screen bg-gradient-to-br  text-white p-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              How to Use Beer Chug Challenge
            </h2>
            <p className="text-xl text-gray-300">
              Master the art of competitive chugging in 4 easy steps!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <Card className="w-full">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src="https://images.pexels.com/photos/7889304/pexels-photo-7889304.jpeg?auto=compress&cs=tinysrgb&w=800"
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        ChugBeer
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        @_chug_beer
                      </h5>
                    </div>
                  </div>
                  <Button
                    className={
                      "bg-transparent text-foreground border-default-200"
                    }
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={"bordered"}
                  >
                    {`${step.title}`}
                  </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                  <p>{step.description}</p>
                  <span className="pt-2">
                    #FrontendWithZoey
                    <span className="py-2" aria-label="computer" role="img">
                      💻
                    </span>
                  </span>
                </CardBody>
                <CardFooter className="gap-3">
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      {index + 1}
                    </p>
                    <p className=" text-default-400 text-small">Step</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl mb-6">
              Ready to become a Beer Chug Champion?
            </p>
          </div>

          <Card className="w-full my-4">
            <CardHeader className="flex gap-3">
              <Avatar
                isBordered
                src="https://images.pexels.com/photos/7889304/pexels-photo-7889304.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <div className="flex flex-col">
                <p className="text-md text-default-500">
                  Pro Tips for Beer Chug Mastery
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <ul className="list-disc list-inside space-y-2  text-gray-300">
                <li>Tilt the glass at a 45-degree angle for optimal flow</li>
                <li>Take deep breaths before starting your chug</li>
                <li>Practice with water to improve your technique safely</li>
                <li>
                  Engage your audience with a victory dance after a successful
                  chug
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </NextUIProvider>
  );
}
