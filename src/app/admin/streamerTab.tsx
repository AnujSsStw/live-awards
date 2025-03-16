"use client";

import { api } from "@/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export function Streamers() {
  const utils = api.useUtils();
  const streamers = api.admin.getStreamers.useQuery();
  const deleteStreamer = api.admin.deleteStreamer.useMutation({
    onSuccess: () => {
      toast.success("Streamer deleted successfully");
      void utils.admin.getStreamers.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this streamer?")) {
      deleteStreamer.mutate(id);
    }
  };

  if (streamers.isLoading) {
    return <div>Loading...</div>;
  }

  if (streamers.isError) {
    return <div>Error loading streamers</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Streamers</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Followers</TableHead>
              <TableHead>Stream Times</TableHead>
              <TableHead>Has Agency</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {streamers.data?.map((streamer) => (
              <TableRow key={streamer.id}>
                <TableCell>{streamer.name}</TableCell>
                <TableCell>{streamer.email}</TableCell>
                <TableCell>{streamer.category}</TableCell>
                <TableCell>{streamer.country}</TableCell>
                <TableCell>{streamer.followers}</TableCell>
                <TableCell>{streamer.streamTimes}</TableCell>
                <TableCell>{streamer.hasAgency}</TableCell>
                <TableCell>{streamer.isVerified ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/streamer/${streamer.tiktokUsername}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(streamer.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
