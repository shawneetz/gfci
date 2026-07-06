import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";

export default function ConnectPage() {
  return (
    <>
      <PageHero
        eyebrow="We'd Love to Meet You"
        title="Connect With Us"
        description="Reach out, ask a question, or plan your first visit."
      />
      <section className="section bg-secondary">
        <Container>
          <p className="text-neutral-500 max-w-xl">
            Contact info, Facebook link, and a contact form go here.
          </p>
        </Container>
      </section>
    </>
  );
}
