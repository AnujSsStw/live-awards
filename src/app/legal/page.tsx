import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Legal() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="mb-6 text-3xl font-bold">Legal Information</h1>

        <Accordion type="single" collapsible>
          <AccordionItem value="terms">
            <AccordionTrigger>Terms and Conditions</AccordionTrigger>
            <AccordionContent>
              <div className="prose dark:prose-invert">
                <p>
                  The Digital Popcorn Live Stream Award is open to TikTok
                  livestreamers from Germany, Austria, and Switzerland who are
                  18 years or older.
                </p>
                <p>
                  By participating, you agree to allow us to use your submitted
                  information for the award show and promotional purposes.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="privacy">
            <AccordionTrigger>Privacy Policy</AccordionTrigger>
            <AccordionContent>
              <div className="prose dark:prose-invert">
                <p>
                  We collect and process personal data solely for the purpose of
                  running the Digital Popcorn Live Stream Award. Your
                  information will not be shared with third parties without your
                  consent.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="prize">
            <AccordionTrigger>Prize Information</AccordionTrigger>
            <AccordionContent>
              <div className="prose dark:prose-invert">
                <p>The winner in each category will receive:</p>
                <ul>
                  <li>Digital Popcorn Live Stream Award 2025 Trophy</li>
                  <li>€500 Prize Money</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
