"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RegisterformSchema } from "@/constants";
import { authClient } from "@/lib/auth-client";
import { UploadButton } from "@/lib/uploadthing";
import { categories, countries, streamTimes } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { toast } from "sonner";

type ProfileFormValues = z.infer<typeof RegisterformSchema>;

export default function ProfilePage() {
  const router = useRouter();

  const updateStreamer = api.streamer.update.useMutation({
    onSuccess: () => {
      toast.success("Profil aktualisiert");
      router.refresh();
    },
  });

  const { data: session, isPending } = authClient.useSession();
  const { data: getStreamer, isLoading: isLoadingStreamer } =
    api.streamer.getStreamer.useQuery(undefined, {
      enabled: !!session,
      refetchOnWindowFocus: false,
    });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(RegisterformSchema),
    defaultValues: {
      name: "",
      email: "",
      tiktokUsername: "",
      country: "Deutschland",
      followerCount: "0-1100",
      streamTimes: "Täglich",
      hasAgency: "Nein",
      category: "Gaming",
      headerImage: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (getStreamer && getStreamer.length > 0) {
      const data = getStreamer[0];
      form.setValue("name", data?.name ?? "");
      form.setValue("email", data?.email ?? "");
      form.setValue(
        "tiktokUsername",
        data?.tiktokUrl?.replace("https://www.tiktok.com/@", "") ?? "",
      );
      form.setValue("country", data?.country ?? "Deutschland");
      form.setValue("followerCount", (data?.followers as any) ?? "0-1100");
      form.setValue("streamTimes", data?.streamTimes ?? "Täglich");
      form.setValue("hasAgency", data?.hasAgency ?? "Nein");
      form.setValue("category", data?.category ?? "Gaming");
      form.setValue("bio", data?.bio ?? "");
      form.setValue("headerImage", data?.headerImageUrl ?? null);
      console.log(data?.headerImageUrl);
    }
  }, [getStreamer, form, session]);

  if (isPending || isLoadingStreamer) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p>Bitte melde dich an, um dein Profil zu bearbeiten</p>
        <Button
          onClick={() =>
            authClient.signIn.social({
              provider: "tiktok",
              callbackURL: "/profile",
            })
          }
        >
          Login
        </Button>
      </div>
    );
  }

  if (getStreamer && getStreamer.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p>Bitte erstelle ein Streamer-Profil</p>
        <Button onClick={() => router.push("/register")}>
          Erstelle ein Streamer-Profil
        </Button>
      </div>
    );
  }

  async function onSubmit(data: ProfileFormValues) {
    try {
      await updateStreamer.mutateAsync({
        ...data,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "Profilaktualisierung fehlgeschlagen. Bitte versuche es erneut.",
      );
    }
  }

  return (
    <div className="container mx-auto mt-10 max-w-4xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Verwalte deine Streamer-Profilinformationen und Einstellungen
          </p>
        </div>
        <div>{session.user.email}</div>
        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Header Bild</CardTitle>
                <CardDescription>
                  Upload a header image for your profile page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-lg border border-border">
                    {form.getValues("headerImage") ||
                    getStreamer?.[0]?.headerImageUrl ? (
                      <img
                        src={
                          form.getValues("headerImage") ||
                          getStreamer?.[0]?.headerImageUrl
                        }
                        alt="Header image"
                        width={800}
                        height={200}
                        className="h-[200px] w-full object-cover"
                      />
                    ) : (
                      <div className="h-[200px] w-full bg-muted" />
                    )}
                  </div>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]) {
                        form.setValue("headerImage", res[0].ufsUrl);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      console.error(error);
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Your public profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="tiktokUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TikTok Username</FormLabel>
                        <FormControl>
                          <Input placeholder="@username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="followerCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follower Count</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select follower range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "0-1100",
                              "1100-5000",
                              "5000-10000",
                              "10000-50000",
                              "50000-100000",
                              "100000+",
                            ].map((count) => (
                              <SelectItem key={count} value={count}>
                                {count}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="streamTimes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stream Times</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stream times" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {streamTimes.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Streaming Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasAgency"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Agentur Status
                          </FormLabel>
                          <FormDescription>
                            Bist du bei einer Agentur?
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value === "Ja"}
                            onCheckedChange={() => {
                              field.onChange(
                                field.value === "Ja" ? "Nein" : "Ja",
                              );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell your audience about yourself..."
                          className="resize-none"
                          {...field}
                          maxLength={500}
                          rows={5}
                        />
                      </FormControl>
                      <FormDescription>
                        Between 100 and 500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={updateStreamer.isPending}>
                {updateStreamer.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
