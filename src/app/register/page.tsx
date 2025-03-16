"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RegisterformSchema } from "@/constants";
import { authClient } from "@/lib/auth-client";
import { UploadButton } from "@/lib/uploadthing";
import { categories } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

type RegisterForm = z.infer<typeof RegisterformSchema>;

export default function Register() {
  const router = useRouter();
  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterformSchema),
    defaultValues: {
      name: "",
      email: "",
      tiktokUsername: "",
      useLoginUsername: false,
      country: "Deutschland",
      followerCount: "0-1100",
      streamTimes: "Täglich",
      hasAgency: "Nein",
      category: "Gaming",
      bio: "",
      //profileImage: undefined,
      headerImage: undefined,
    },
  });
  const registerStreamer = api.streamer.register.useMutation();
  const { data: session, isPending } = authClient.useSession();
  const { data: getStreamer, isLoading: isLoadingStreamer } =
    api.streamer.getStreamer.useQuery(undefined, {
      enabled: !!session,
    });

  useEffect(() => {
    if (getStreamer && getStreamer.length > 0) {
      const data = getStreamer[0];
      form.setValue("name", data?.name ?? "");
      form.setValue("email", data?.email ?? "");
      form.setValue("tiktokUsername", data?.tiktokUsername ?? "");
      form.setValue("country", data?.country ?? "Deutschland");
      form.setValue("followerCount", (data?.followers as any) ?? "0-1100");
      form.setValue("streamTimes", data?.streamTimes ?? "Täglich");
      form.setValue("hasAgency", data?.hasAgency ?? "Nein");
      form.setValue("category", data?.category ?? "Gaming");
      form.setValue("bio", data?.bio ?? "");
    }
  }, [form, getStreamer]);

  if (isPending || isLoadingStreamer) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p>Bitte melde dich an, um dich zu registrieren</p>
        <Button
          onClick={() =>
            authClient.signIn.social({
              provider: "tiktok",
              callbackURL: "/register",
            })
          }
        >
          Login
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: RegisterForm) => {
    try {
      console.log(data);
      await registerStreamer.mutateAsync(data);
      toast.success("Anmeldung erfolgreich");
      router.push("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Anmeldung fehlgeschlagen");
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto max-w-4xl px-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">
              Live Stream Awards 2025 Anmeldung
            </CardTitle>
            <CardDescription>
              Melde dich jetzt für die Live Stream Awards 2025 an! Als Newcomer
              darfst du maximal 1.100 Follower haben. Nach deiner Anmeldung
              erhältst du einen Login, mit dem du deine Streamer-Setcard
              bearbeiten kannst. Bitte vervollständige deine Informationen, um
              deine Teilnahme abzuschließen. Vielen Dank und viel Spaß beim
              Streamen! 🎉
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label>Vor- und Nachname *</Label>
                  <Input
                    {...form.register("name")}
                    placeholder="Max Mustermann"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label>E-Mail-Adresse *</Label>
                  <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="max@beispiel.de"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label>Herkunft *</Label>
                  <Controller
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wähle dein Land" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Deutschland">
                            Deutschland
                          </SelectItem>
                          <SelectItem value="Österreich">Österreich</SelectItem>
                          <SelectItem value="Schweiz">Schweiz</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.country && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.country.message}
                    </p>
                  )}
                </div>

                {/* TikTok Username */}
                <div className="space-y-2">
                  <Label>TikTok Username *</Label>
                  <Input
                    {...form.register("tiktokUsername", {
                      validate: (value) => {
                        if (value.includes(" ")) {
                          return "Leerzeichen sind nicht erlaubt";
                        }
                        return true;
                      },
                    })}
                    placeholder="username"
                  />
                  <FormDescription>
                    Bitte gebe deinen TikTok Username ein, ohne das @ und ohne
                    Leerzeichen oder Sonderzeichen.
                  </FormDescription>
                  {form.formState.errors.tiktokUsername && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.tiktokUsername.message}
                    </p>
                  )}

                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="useLoginUsername"
                      className="h-4 w-4 rounded border-gray-300"
                      {...form.register("useLoginUsername", {
                        onChange: (e) => {
                          if (e.target.checked && session?.user?.name) {
                            form.setValue("tiktokUsername", session.user.name);
                          } else if (!e.target.checked) {
                            form.setValue("tiktokUsername", "");
                          }
                        },
                      })}
                    />
                    <Label htmlFor="useLoginUsername" className="text-sm">
                      Login-Namen verwenden
                    </Label>
                  </div>
                </div>

                {/* Follower Count */}
                <div className="space-y-2">
                  <Label>Followeranzahl *</Label>
                  <Controller
                    control={form.control}
                    name="followerCount"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value as any)}
                        value={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0-1100" id="f1" />
                          <Label htmlFor="f1">0 – 1.100 (Newcomer)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1100-5000" id="f2" />
                          <Label htmlFor="f2">1.100 – 5.000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5000-10000" id="f3" />
                          <Label htmlFor="f3">5.000 – 10.000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="10000-50000" id="f4" />
                          <Label htmlFor="f4">10.000 – 50.000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="50000-100000" id="f5" />
                          <Label htmlFor="f5">50.000 – 100.000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="100000+" id="f6" />
                          <Label htmlFor="f6">100.000+ (Top-Streamer)</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {form.formState.errors.followerCount && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.followerCount.message}
                    </p>
                  )}
                </div>

                {/* Stream Times */}
                <div className="space-y-2">
                  <Label>Live-Zeiten *</Label>
                  <Controller
                    control={form.control}
                    name="streamTimes"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value as any)}
                        value={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Täglich" id="st1" />
                          <Label htmlFor="st1">Täglich</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Am Wochenende" id="st2" />
                          <Label htmlFor="st2">Am Wochenende</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Wöchentlich" id="st3" />
                          <Label htmlFor="st3">Wöchentlich</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {form.formState.errors.streamTimes && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.streamTimes.message}
                    </p>
                  )}
                </div>

                {/* Agency */}
                <div className="space-y-2">
                  <Label>Bist du in einer Agentur? *</Label>
                  <Controller
                    control={form.control}
                    name="hasAgency"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value as any)}
                        className="flex gap-4"
                        value={field.value}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Ja" id="a1" />
                          <Label htmlFor="a1">Ja</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Nein" id="a2" />
                          <Label htmlFor="a2">Nein</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {form.formState.errors.hasAgency && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.hasAgency.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Kategorie *</Label>
                  <Controller
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wähle deine Streaming-Kategorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category === "Music" ? "Musik" : category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.category && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.category.message}
                    </p>
                  )}
                </div>

                {/* Profile Image */}
                {/* <div className="space-y-2">
                  <Label>Profilbild hochladen *</Label>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      alert("Upload Completed");
                      if (res?.[0]?.ufsUrl) {
                        form.setValue("profileImage", res[0].ufsUrl);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    Min. 400x400 Pixel, max. 2 MB, JPG/PNG
                  </p>
                  {form.formState.errors.profileImage && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.profileImage.message?.toString()}
                    </p>
                  )}
                </div> */}

                {/* Header Image */}
                <div className="space-y-2">
                  <Label>Header-Bild hochladen *</Label>
                  <UploadButton
                    disabled={getStreamer && getStreamer.length > 0}
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      alert("Upload Completed");
                      if (res?.[0]?.ufsUrl) {
                        form.setValue("headerImage", res[0].ufsUrl);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    Min. 1200x400 Pixel, max. 3 MB, JPG/PNG
                  </p>
                  {form.formState.errors.headerImage && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.headerImage.message?.toString()}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label>Über dich und deinen Live-Stream *</Label>
                  <Textarea
                    {...form.register("bio")}
                    placeholder="Stelle dich und dein Streaming-Format vor. Was erwartet die Zuschauer in deinen Streams?"
                    className="h-32"
                  />
                  <p className="text-sm text-muted-foreground">
                    Mindestens 10 Zeichen
                  </p>
                  {form.formState.errors.bio && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.bio.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    registerStreamer.isPending ||
                    // !form.formState.isValid ||
                    (getStreamer && getStreamer.length > 0)
                  }
                >
                  {registerStreamer.isPending
                    ? "Anmeldung absenden..."
                    : "Anmeldung absenden"}
                </Button>
                {getStreamer && getStreamer.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Deine Informationen wurden bereits gespeichert.{" "}
                    <Link className="text-primary underline" href="/profile">
                      Hier geht es zu deinem Profil
                    </Link>
                  </p>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Sponsors Section */}
        {/* <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">Unsere Sponsoren</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {sponsors.map((sponsor) => {
                const Icon = sponsor.icon;
                return (
                  <Card
                    key={sponsor.name}
                    className="group relative overflow-hidden"
                  >
                    <CardContent className="pt-6">
                      <div className="mb-4 flex items-center gap-4">
                        <Icon className="h-8 w-8 text-primary" />
                        <h3 className="text-xl font-semibold">
                          {sponsor.name}
                        </h3>
                      </div>
                      <p className="mb-6 line-clamp-2 h-12 text-muted-foreground">
                        {truncateText(sponsor.description, 50)}
                      </p>
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button
                          variant="secondary"
                          className="w-full bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        >
                          Zum Sponsor
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
