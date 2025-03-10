import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/trpc/react";

const contactSchema = z.object({
  name: z.string().min(2, "Name ist zu kurz"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  message: z.string().min(10, "Nachricht ist zu kurz"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });
  const { mutateAsync: createContact } =
    api.contact.createContactRequest.useMutation();

  const onSubmit = async (data: ContactForm) => {
    try {
      await createContact(data);
      toast.success("Nachricht gesendet");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Fehler beim Senden der Nachricht");
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Kontakt</h1>

        {/* Welcome Text */}
        <Card className="mb-8">
          <CardContent className="prose dark:prose-invert max-w-none p-6">
            <div className="space-y-4 text-foreground">
              <p>
                Vielen Dank für Ihr Interesse am Digital Popcorn Live Stream
                Award 2025! Wir freuen uns, dass Sie mit uns in Kontakt treten
                möchten. Ob Sie Fragen zu unserer Website, dem Bewerbungsprozess
                oder den Abstimmungen haben, oder ob Sie Unterstützung
                benötigen, wir sind für Sie da!
              </p>
              <p>
                Als Teil der Live-Stream-Awards.de Community liegt uns Ihre
                reibungslose Erfahrung besonders am Herzen. Wir stehen bereit,
                Ihnen alle benötigten Informationen zur Verfügung zu stellen,
                damit Sie sich bestens informiert fühlen.
              </p>
              <p>
                Zögern Sie nicht, uns zu kontaktieren. Wir antworten Ihnen
                schnell und helfen Ihnen gerne weiter!
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold text-foreground">
                  Kontaktinformationen
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <p className="text-foreground">info@live-stream-awards.de</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div className="text-foreground">
                    <p>Digital Popcorn</p>
                    <p>Kai Bothstede</p>
                    <p>Dorfstrasse 15</p>
                    <p>21514 Fitzen</p>
                    <p>Deutschland</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold text-foreground">
                  Kontaktformular
                </h2>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel className="text-sm font-medium text-foreground">
                            E-Mail
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">
                            Nachricht
                          </FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={5} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Nachricht senden
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
