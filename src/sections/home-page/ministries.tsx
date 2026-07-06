import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/image-card";

const ministries = [
  {
    title: "Kids Ministry",
    image: "/images/home-page/kids-ministry.jpg",
    href: "/ministries/kids",
  },
  {
    title: "Youth Assemble",
    image: "/images/home-page/youth-assemble.jpg",
    href: "/ministries/youth",
  },
  {
    title: "Connect Groups",
    image: "/images/home-page/connect-groups.jpg",
    href: "/ministries/connect-groups",
  },
  {
    title: "Outreach",
    image: "/images/home-page/outreach.jpg",
    href: "/ministries/outreach",
  },
];

export function Ministries() {
  return (
    <section className="bg-surface-inverse py-16">
      <Container>
        <div className="max-w-xl">
          <h2 className="text-section-title text-ink-inverse">
            Ministries
          </h2>

          <p className="mt-6 text-body-lg leading-relaxed text-ink-inverse-secondary">
            We believe growth happens in community.
            <br />
            Discover a ministry where you can belong and serve.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5">
          {ministries.map((ministry) => (
            <ImageCard
              key={ministry.title}
              title={ministry.title}
              image={ministry.image}
              href={ministry.href}
            />
          ))}
        </div>

        <div className="mt-10">
          <ButtonLink
            href="/ministries"
            text="ink"
            fill="inverse"
            border="ink"
            shadow="grey"
            className="w-full"
          >
            Explore All Ministries
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}