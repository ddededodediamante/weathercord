import Box from "../Box/Box";
import { contributors } from "@/lib/contributors";
import { Heart, Quote } from "lucide-react";

const AboutTab = () => {
  return (
    <>
      <h1>About Weathercord</h1>
      <p>Weathercord is an instant messaging app made to be highly customisable and personal.</p>
      <h2><Heart /> Source Code Contributors</h2>
      <p>Weathercord is an open source project, meaning anyone can contribute to development! Below is a list of people who have contributed source code to Weathercord.</p>
      <div className="grid grid-cols-2 mt-1">
        {contributors.map((contributor, index) => {
          return (
            <a key={index} className="active:*:scale-95 m-0.5" href={"https://github.com/" + contributor.github.username} target="_blank">
              <Box className="h-full p-1 rounded-2xl flex transition">
                <img className="rounded-full h-3.5 mr-1" src={"https://avatars.githubusercontent.com/u/" + contributor.github.id} alt={contributor.github.username} />
                <div>
                  <h2 className="mt-0 mb-0">{contributor.name ?? contributor.github.username}</h2>
                  {contributor.quote &&
                    <p className="text-(--sub) italic"><Quote className="scale-90" /> {contributor.quote}</p>
                  }
                </div>
              </Box>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default AboutTab;
