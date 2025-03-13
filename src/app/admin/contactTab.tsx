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

export function ContactRequests() {
  const contactRequests = api.admin.getContactRequests.useQuery();
  const utils = api.useUtils();

  const deleteMutation = api.admin.deleteContactRequest.useMutation({
    onSuccess: () => {
      void utils.admin.getContactRequests.invalidate();
    },
  });

  const handleDelete = (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this contact request?")
    ) {
      deleteMutation.mutate(id);
    }
  };

  if (contactRequests.isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (contactRequests.error) {
    return (
      <div className="p-6 text-red-500">Error loading contact requests</div>
    );
  }

  return (
    <div className="w-full p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contactRequests.data?.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.createdAt.toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{request.name}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell className="max-w-md truncate">
                {request.message}
              </TableCell>
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
