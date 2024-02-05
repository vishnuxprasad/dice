import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type OrganisationReqCardProps = {
  title: string;
  website: string;
  imageLink: string;
  className?: string;
};

export const OrganisationReqCard = ({
  title,
  website,
  imageLink,
  className,
}: OrganisationReqCardProps) => {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col p-4 gap-6">
        <div className="flex gap-6 items-center">
          <Avatar>
            <AvatarImage src={imageLink} />
            <AvatarFallback>#</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <div className="text-xl font-medium">{title}</div>
            <div className="text-sm text-ring">{website}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Button className="grow bg-green-500 text-white w-full hover:bg-green-500/90 dark:bg-green-700  dark:hover:bg-green-700/90">
              Accept
            </Button>
            <Button className="grow w-full" variant="destructive">
              Reject
            </Button>
          </div>
          <Button
            className="bg-gray-500 text-white w-full hover:bg-gray-500/90 dark:bg-gray-700  dark:hover:bg-gray-700/90"
            variant="secondary"
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};