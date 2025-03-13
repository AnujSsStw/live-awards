import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/server";
import { ContactRequests } from "./contactTab";
import { SponsorRequests } from "./sponsorTab";
import { Streamers } from "./streamerTab";

export default async function AdminPage() {
  const isAdmin = await api.admin.isAdmin();
  if (!isAdmin) {
    return <div>You are not authorized to access this page</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Tabs defaultValue="contact" className="w-11/12">
        <TabsList className="w-full gap-3">
          <TabsTrigger value="contact">Contact Requests</TabsTrigger>
          <TabsTrigger value="sponsor">Sponsor Requests</TabsTrigger>
          <TabsTrigger value="streamers">Streamers</TabsTrigger>
        </TabsList>
        <TabsContent value="contact">
          <ContactRequests />
        </TabsContent>
        <TabsContent value="sponsor">
          <SponsorRequests />
        </TabsContent>
        <TabsContent value="streamers">
          <Streamers />
        </TabsContent>
      </Tabs>
    </div>
  );
}
