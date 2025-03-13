"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";

export function SponsorRequests() {
  const sponsorRequests = api.admin.getSponsorRequests.useQuery();
  const utils = api.useUtils();

  const deleteMutation = api.admin.deleteSponsorRequest.useMutation({
    onSuccess: () => {
      // Invalidate the query to refresh the data
      void utils.admin.getSponsorRequests.invalidate();
    },
  });

  const handleDelete = (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this sponsor request?")
    ) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="w-full p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Contact Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sponsorRequests.data?.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.createdAt.toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">
                {request.contactName}
              </TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.companyName}</TableCell>
              <TableCell>{request.website}</TableCell>
              <TableCell>{request.comments}</TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => handleDelete(request.id)}
                  className="text-sm text-red-600 transition-colors hover:text-red-900"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
